import React, { useState, useEffect } from 'react';
import * as audioActions from '../../actions/audioActions';
import ListBox from '../common/ListBox';
import TwoDPDisp from '../common/TwoDPoints';
import { connect } from 'react-redux';
import * as AudioFilters from '../../data/audioFilters/filters';

import {generateConsecutiveFilterData, getFreqRange} from './Utils';

interface FilterType {
  edit: boolean;
  name: string;
  desc: string;
}

const AudioFilter = (props) => {
  const dispatch = props.dispatch;
  const [filterState, setFilterState] = useState({
    showModal: false,
    filters: props.filters,
    filters_AJAXFlag: props.filters_AJAXFlag,
    selectedFilter: {
      data: [],
      edit:false,
      name: null
    },
  });
  useEffect(() => {
    dispatch(audioActions.loadFiltersSuccess(AudioFilters));
  }, []);
  const getFiltersOnClick = () => {
    //this.props.getFilters();
  };
  const clearFilterOnClick = () => {
    setFilterState({
      ...filterState,
      selectedFilter: {
        data: [],
        edit: false,
        name: null
      }
    });
    dispatch(audioActions.applyFilter(null, null));
  };
  const addFiltersOnClick = () => {
    const { showModal } = filterState;
    setFilterState({
      ...filterState,
      showModal: !showModal
    });
  };
  const editFilterOnClick = () => {};
  const deleteFilterOnClick = () => {};
  const applyFilterOnClick = () => {
    if (filterState.selectedFilter && filterState.selectedFilter.data.length >= 2){
        const freqDataRange = getFreqRange(props.sampleRate, props.fftSize, props.freqRange);
        const freqDataSize = freqDataRange[1] - freqDataRange[0] + 1;
        const generateFilter = generateConsecutiveFilterData(freqDataSize - 1, filterState.selectedFilter.data);
        dispatch(audioActions.applyFilter(filterState.selectedFilter.name, generateFilter));
    }
  };
  const listBoxClick = (filterName) => {
    setFilterState({
      ...filterState,
      selectedFilter: {
        ...props.filters[filterName],
        name: filterName
      }
    });
  };
  const modalBtnHandler = () => {
    setFilterState({
      ...filterState,
      showModal:false
    });
  };
  // should return two inputs and a add button
  const { selectedFilter } = filterState;
  const builtInFilters = Object.values(props.filters).filter((f: FilterType)=> !f.edit);
  const editBtnDisable = builtInFilters.includes(selectedFilter);
  //filter_AJAXFlag = 1, calling ajax
  const listBoxStatus = props.filters_AJAXFlag;
  const filterData = Object.values(props.filters).map((f: FilterType)=>({
    name: f.name,
    value:f.name,
    title: f.desc
  }));
  const listBoxstyle = {width: "200px", height: "200px", overflowX:"none", overflowY:"auto"};
  return (
    <div className="audioFilter">
      <div style={{flex:0, width:"200px"}}>
        <p><strong>Filters:</strong></p>
        <ListBox status={listBoxStatus} data={filterData} style={listBoxstyle} clickEvt={listBoxClick} curName={selectedFilter.name}/>
        <div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-success btn-sm" onClick={getFiltersOnClick}>Get</button>
            <button type="button" className="btn btn-success btn-sm" onClick={clearFilterOnClick}>Clear</button>
            {false && <button type="button" className="btn btn-success btn-sm" onClick={addFiltersOnClick}>Add</button>}
            {false && <button type="button" className="btn btn-success btn-sm" disabled={editBtnDisable} onClick={editFilterOnClick}>Edit</button>}
            {false && <button type="button" className="btn btn-success btn-sm" disabled={editBtnDisable} onClick={deleteFilterOnClick}>Delete</button>}
          </div>
        </div>
      </div>
      <div style={{flex:1, width:"250px", marginLeft:"10px"}}>
        <p><strong>Points:x - y (percentage)</strong></p>
        {listBoxStatus==0 && <TwoDPDisp points={selectedFilter.data} editable={selectedFilter.edit} width="250px" height="200px" />}
        {listBoxStatus==0 && selectedFilter.data.length>0 && <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-success btn-sm" onClick={applyFilterOnClick}>Apply</button>
        </div>}
      </div>
  </div>); 
}

function mapStateToProps(state){
    const {filters_AJAXFlag, filters, sampleRate, fftSize, freqRange} = state.audio;
    return {filters_AJAXFlag, filters, sampleRate, fftSize, freqRange};
}

export default connect(mapStateToProps)(AudioFilter);
