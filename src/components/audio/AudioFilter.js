import React from 'react';
import * as audioActions from '../../actions/audioActions';
import ListBox from '../common/ListBox';
import TwoDPDisp from '../common/TwoDPoints';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {generateConsecutiveFilterData, getFreqRange} from './Utils';

class AudioFilter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.filtersRef = React.createRef(); 
        this.getFiltersOnClick = this.getFiltersOnClick.bind(this);
        this.addFiltersOnClick = this.addFiltersOnClick.bind(this);
        this.editFilterOnClick = this.editFilterOnClick.bind(this);
        this.delFilterOnClick = this.delFilterOnClick.bind(this);
        this.applyFilterOnClick = this.applyFilterOnClick.bind(this);
        this.listBoxClick = this.listBoxClick.bind(this);
        //this.addFilterPoint = this.addFilterPoint.bind(this);
        //this.removeFilterPoint = this.removeFilterPoint.bind(this);
        //this.saveFilter = this.saveFilter.bind(this);
        this.state = {filters:this.props.filters, filters_AJAXFlag: this.props.filters_AJAXFlag, selectedFilter:{data:[],edit:false}};
        this.props.getFilters();
    }
    
    componentWillReceiveProps(nextProps){
        console.log("audio will receive props", nextProps);
        //this.setState({filters:nextProps.filters, filters_AJAXFlag: nextProps.filters_AJAXFlag})
    }
    getFiltersOnClick(){
        this.props.getFilters();
    }
    addFiltersOnClick(){
        console.log("add custome filter!!!")
    }
    editFilterOnClick(){

    }
    delFilterOnClick(){

    }
    applyFilterOnClick(){
        console.log("apply filter btn clicked", this.state.selectedFilter, this.props);
        if (this.state.selectedFilter && this.state.selectedFilter.data.length>=2){
            let freqDataRange = getFreqRange(this.props.sampleRate, this.props.fftSize, this.props.freqRange);
            let freqDataSize = freqDataRange[1]-freqDataRange[0]+1;
            console.log(freqDataSize);
            let generateFilter = generateConsecutiveFilterData(freqDataSize-1, this.state.selectedFilter.data);
            console.log("generatedFilter!!!", generateFilter);
            this.props.applyFilter(generateFilter);
        }
    }
    listBoxClick(filterName){
        console.log("clicked filter name", filterName);
        this.setState({selectedFilter:this.props.filters[filterName]});
    }
    render(){
        // should return two inputs and a add button
        console.log("rendering audio filters", this.props);
        let infoLabelClass = "label label-default";
        let selectedFilter = this.state.selectedFilter;
        console.log("selected filter", selectedFilter);
        let builtInFilters = Object.values(this.props.filters).filter(f=>{f.edit==false});
        let editBtnDisable = builtInFilters.includes(selectedFilter).toString();
        //filter_AJAXFlag = 1, calling ajax
        let listBoxStatus = this.props.filters_AJAXFlag;
        let filterData = Object.values(this.props.filters).map(fd=>({name:fd.name,value:fd.name, title:fd.desc}));
        let listBoxstyle = {width: "200px", height: "200px", overflowX:"none", overflowY:"auto"}
        console.log(listBoxStatus, filterData, listBoxstyle);
        return (
        <div className="audioFilter">
            <div style={{flex:0, width:"200px"}}>
                <p><strong>Filters:</strong></p>
                <ListBox status={listBoxStatus} data={filterData} style={listBoxstyle} clickEvt={this.listBoxClick} />
                <div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success btn-sm" onClick={this.getFiltersOnClick}>Get</button>
                        <button type="button" className="btn btn-success btn-sm" onClick={this.addFiltersOnClick}>Add</button>
                        <button type="button" className="btn btn-success btn-sm" disabled={editBtnDisable} onClick={this.edtFiltersOnClick}>Edt</button>
                        <button type="button" className="btn btn-success btn-sm" disabled={editBtnDisable} onClick={this.deleteFilterOnClick}>Del</button>
                    </div>
                </div>
            </div>
            <div style={{flex:1, width:"250px", marginLeft:"10px"}}>
                <p><strong>Points:x - y (percentage)</strong></p>
                <TwoDPDisp points={selectedFilter.data} editable={selectedFilter.edit} width="250px" height="200px"></TwoDPDisp>
                {selectedFilter.data.length>0 && <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success btn-sm" onClick={this.applyFilterOnClick}>Apply</button>
                </div>}
            </div>
        </div>)
    }
}

function mapStateToProps(state){
    let {filters_AJAXFlag, filters, sampleRate, fftSize, freqRange} = state.audio;
    return {filters_AJAXFlag, filters, sampleRate, fftSize, freqRange};
}
function mapDispatchToProps(dispatch){
    return {
        getFilters: ()=>{
            dispatch(audioActions.loadAllFilters())
        },
        applyFilter: (appliedFilter)=>{
            dispatch(audioActions.applyFilter(appliedFilter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioFilter)