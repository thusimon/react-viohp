/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MusicStaff from './MusicStaff';
import * as Constants from './Constants';
import * as Utils from './Utils';
import TopControls from './TopControls';
import * as musicActions from '../../actions/musicActions';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.signatureTypes = Constants.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    this.scaleTypes = Utils.getAllScaleNames();
    // init state
    const signature = 'Major';
    const scale = 'C';
    const notes = [];
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
          <MusicStaff notes={this.props.notes} scaleHead={this.props.scaleHead}/>
        </div>
      </div>);
  }
}

MusicStaffPage.propTypes = {
  notes: PropTypes.array,
  scaleHead: PropTypes.array
};

function mapStateToProps(state, ownProps){
  return state.music;
}

export default connect(mapStateToProps)(MusicStaffPage);
