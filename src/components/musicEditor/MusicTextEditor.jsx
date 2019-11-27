/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import NoteEditor from './NoteEditor';
import {connect} from 'react-redux';
import * as musicActions from '../../actions/musicActions';
import './music-text-editor.scss';


const MusicTextEditor = (props) => {
  const infoChange = (evt) => {
    const target = evt.target;
    const infoName = target.id;
    const infoValue = target.value;
    props.updateScoreInfo(infoName, infoValue);
  };

  const signautreValue = props.musicInfo.signature ? props.musicInfo.signature : 'Major';
  const scaleValue = props.musicInfo.scale ? props.musicInfo.scale : 'C';
  return (
  <div className="music-text-editor-main">
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Title</span>
      </div>
      <input type="text" className="form-control" id="title" name="title" value={props.musicInfo.title} onChange={infoChange}/>
    </div>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Author</span>
      </div>
      <input type="text" className="form-control" id="author" name="author" value={props.musicInfo.author} onChange={infoChange}/>
    </div>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Signature</span>
      </div>
      <select className="form-control" id="signature" name="signature" onChange={infoChange} 
        value={signautreValue}>
        <option value="Major">Major</option>
        <option value="Minor">Minor</option>
      </select>
    </div>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Scale</span>
      </div>
      <select className="form-control" id="scale" name="scale" onChange={infoChange} 
        value={scaleValue}>
        <option value="C">C</option>
        <option value="CS">C#</option>
        <option value="DF">{'D\u266d'}</option>
        <option value="D">D</option>
        <option value="DS">D#</option>
        <option value="EF">{'E\u266d'}</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="FS">F#</option>
        <option value="GF">{'G\u266d'}</option>
        <option value="G">G</option>
        <option value="GS">G#</option>
        <option value="AF">{'A\u266d'}</option>
        <option value="A">A</option>
        <option value="AS">A#</option>
        <option value="BF">{'B\u266d'}</option>
        <option value="B">B</option>
      </select>
    </div>
    <NoteEditor />
  </div>);
};

MusicTextEditor.propTypes = {
  musicInfo: PropTypes.object,
  updateScoreInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {id, musicInfo} = state.music;
  return {id, musicInfo};
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateScoreInfo: (name, value) => {
      dispatch(musicActions.updateScoreInfo(name, value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicTextEditor);
