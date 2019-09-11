import React from 'react';
import * as audioActions from '../../actions/audioActions';
import ListBox from '../common/ListBox';
import TwoDPDisp from '../common/TwoDPoints';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {generateConsecutiveFilterData, getFreqRange} from './Utils';
import Modal from '../common/Modal';

class AudioFilter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.filtersRef = React.createRef(); 
        this.getFiltersOnClick = this.getFiltersOnClick.bind(this);
        this.clearFilterOnClick = this.clearFilterOnClick.bind(this);
        this.addFiltersOnClick = this.addFiltersOnClick.bind(this);
        this.editFilterOnClick = this.editFilterOnClick.bind(this);
        this.delFilterOnClick = this.delFilterOnClick.bind(this);
        this.applyFilterOnClick = this.applyFilterOnClick.bind(this);
        this.listBoxClick = this.listBoxClick.bind(this);
        this.modalBtnHandler = this.modalBtnHandler.bind(this);
        //this.addFilterPoint = this.addFilterPoint.bind(this);
        //this.removeFilterPoint = this.removeFilterPoint.bind(this);
        //this.saveFilter = this.saveFilter.bind(this);
        this.state = {showModal:false, filters:this.props.filters, filters_AJAXFlag: this.props.filters_AJAXFlag, selectedFilter:{data:[],edit:false}};
        this.props.getFilters();
    }
    
    getFiltersOnClick(){
        this.props.getFilters();
    }
    clearFilterOnClick(){
        this.setState({selectedFilterName:null, selectedFilter:{data:[],edit:false}});
        this.props.applyFilter(null, null);
    }
    addFiltersOnClick(){
        let {showModal} = this.state;
        this.setState({showModal: !showModal});
    }
    editFilterOnClick(){

    }
    delFilterOnClick(){

    }
    applyFilterOnClick(){
        if (this.state.selectedFilter && this.state.selectedFilter.data.length>=2){
            let freqDataRange = getFreqRange(this.props.sampleRate, this.props.fftSize, this.props.freqRange);
            let freqDataSize = freqDataRange[1]-freqDataRange[0]+1;
            let generateFilter = generateConsecutiveFilterData(freqDataSize-1, this.state.selectedFilter.data);
            this.props.applyFilter(this.state.selectedFilter.name, generateFilter);
        }
    }
    listBoxClick(filterName){
        this.setState({selectedFilterName:filterName, selectedFilter:this.props.filters[filterName]});
    }
    modalBtnHandler(evt){
        this.setState({showModal:false});
    }
    render(){
        // should return two inputs and a add button
        let infoLabelClass = "label label-default";
        let {selectedFilter, selectedFilterName} = this.state;
        let builtInFilters = Object.values(this.props.filters).filter(f=>f.edit==false);
        let editBtnDisable = builtInFilters.includes(selectedFilter).toString();
        //filter_AJAXFlag = 1, calling ajax
        let listBoxStatus = this.props.filters_AJAXFlag;
        let filterData = Object.values(this.props.filters).map(fd=>({name:fd.name,value:fd.name, title:fd.desc}));
        let listBoxstyle = {width: "200px", height: "200px", overflowX:"none", overflowY:"auto"};
        return (<div className="audioFilter">
            <div style={{flex:0, width:"200px"}}>
                <p><strong>Filters:</strong></p>
                <ListBox status={listBoxStatus} data={filterData} style={listBoxstyle} clickEvt={this.listBoxClick} curName={selectedFilterName}/>
                <div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success btn-sm" onClick={this.getFiltersOnClick}>Get</button>
                        <button type="button" className="btn btn-success btn-sm" onClick={this.clearFilterOnClick}>Clear</button>
                        {false && <button type="button" className="btn btn-success btn-sm" onClick={this.addFiltersOnClick}>Add</button>}
                        {false && <button type="button" className="btn btn-success btn-sm" disabled={editBtnDisable} onClick={this.edtFiltersOnClick}>Edt</button>}
                        {false && <button type="button" className="btn btn-success btn-sm" disabled={editBtnDisable} onClick={this.deleteFilterOnClick}>Del</button>}
                    </div>
                </div>
            </div>
            <div style={{flex:1, width:"250px", marginLeft:"10px"}}>
                <p><strong>Points:x - y (percentage)</strong></p>
                {listBoxStatus==0 && <TwoDPDisp points={selectedFilter.data} editable={selectedFilter.edit} width="250px" height="200px" />}
                {listBoxStatus==0 && selectedFilter.data.length>0 && <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success btn-sm" onClick={this.applyFilterOnClick}>Apply</button>
                </div>}
            </div>
        </div>);
    }
}

function mapStateToProps(state){
    let {filters_AJAXFlag, filters, sampleRate, fftSize, freqRange} = state.audio;
    return {filters_AJAXFlag, filters, sampleRate, fftSize, freqRange};
}

function mapDispatchToProps(dispatch){
    return {
        getFilters: ()=>{
            dispatch(audioActions.loadAllFilters());
        },
        applyFilter: (filtername, appliedFilter)=>{
            dispatch(audioActions.applyFilter(filtername, appliedFilter));
        }
    };
}

AudioFilter.propTypes = {
    filters: PropTypes.object,
    filters_AJAXFlag: PropTypes.number,
    getFilters: PropTypes.func,
    applyFilter: PropTypes.func,
    sampleRate: PropTypes.number,
    fftSize: PropTypes.number,
    freqRange: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioFilter);