/* eslint-disable react/jsx-no-bind */
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ConvertNotesToText} from './Utils';
import {connect} from 'react-redux';
import * as musicActions from '../../actions/musicActions';
import {UnControlled as CodeMirror} from 'react-codemirror2';

const editorChange = (editor, data, value) => {
  console.log(value);
};

const codeMirrorOptions = {
  mode: 'javascript',
  theme: 'xq-light',
  lineNumbers: true,
  lineWrapping: false,
  indentUnit: 0
};

const MusicTextEditor = (props) => {
  const [editorInfo, setEditorInfo] = useState(props.musicInfo);
  const [editorNote, setEditorNote] = useState(props.notes);
  const notesText = ConvertNotesToText(editorNote);
  const infoChange = (evt) => {
    const target = evt.target;
    const infoName = target.id;
    const infoValue = target.value;
    props.updateScoreInfo(infoName, infoValue);
    const updatedState = Object.assign(editorInfo, {[infoName]: infoValue});
    setEditorInfo(updatedState);
  };
  useEffect(() => {
    console.log(props);
  });
  return (
  <div style={{display:"flex", flexDirection:"column", height: "100%"}}>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Title</span>
      </div>
      <input type="text" className="form-control" id="title" name="title" value={editorInfo.title} onChange={infoChange}/>
    </div>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Author</span>
      </div>
      <input type="text" className="form-control" id="author" name="author" value={editorInfo.author} onChange={infoChange}/>
    </div>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Signature</span>
      </div>
      <input type="text" className="form-control" id="signature" name="signature" value={editorInfo.signature} onChange={infoChange}/>
    </div>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Scale</span>
      </div>
      <input type="text" className="form-control" id="scale" name="scale" value={editorInfo.scale} onChange={infoChange}/>
    </div>
    <div className="input-group">
      <div className="input-group">
        <p className="input-group-text">Notes</p>
      </div>
      <br />
      <div style={{textAlign: "left"}}>
        <CodeMirror value={notesText} options={codeMirrorOptions} onChange={editorChange} />
      </div>
    </div>
  </div>);
};

MusicTextEditor.propTypes = {
  musicInfo: PropTypes.object,
  notes: PropTypes.array,
  updateScoreInfo: PropTypes.func
};

const mapStateToProps = (state) => {
  const {musicInfo, notes} = state.music;
  return {musicInfo, notes};
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateScoreInfo: (name, value) => {
      dispatch(musicActions.updateScoreInfo(name, value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicTextEditor);