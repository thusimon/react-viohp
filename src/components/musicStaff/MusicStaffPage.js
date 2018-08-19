/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MusicStaff from './MusicStaff';
import * as Constants from './Constants';
import * as Utils from './Utils';
import TopControls from './TopControls';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.signatureTypes = Constants.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    this.scaleTypes = Utils.getAllScaleNames();
    // init state
    const signature = 'Major';
    const scale = 'C';
    const notes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    this.state = {signature, scale, notes};
  }


  render(){
    return (
      <div>
        <div style={{marginTop:'30px'}}>
          <TopControls />
        </div>
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicStaff syms={this.state.notes} />
        </div>
      </div>);
  }
}

function mapStateToProps(state, ownProps){
  const courseId = ownProps.match.params.id;
  let course = {title:"", category:"", length:""};
  if (courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormatted(state.authors)
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(courseActions, dispatch)
  };
}

//export default MusicStaffPage;
export default connect(mapStateToProps, mapDispatchToProps)(MusicStaffPage);
