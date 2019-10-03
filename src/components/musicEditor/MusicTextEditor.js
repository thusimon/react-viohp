/* eslint-disable react/jsx-no-bind */
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ConvertNotesToText, ConvertTextToNotes} from './Utils';
import {connect} from 'react-redux';
import * as musicActions from '../../actions/musicActions';
import {UnControlled as CodeMirror} from 'react-codemirror2';

const codeMirrorOptions = {
  mode: 'javascript',
  theme: 'xq-light',
  lineNumbers: true,
  lineWrapping: false,
  indentUnit: 0
};

const MusicTextEditor = (props) => {
  const [editorInfo, setEditorInfo] = useState(props.musicInfo);
  const infoChange = (evt) => {
    const target = evt.target;
    const infoName = target.id;
    const infoValue = target.value;
    props.updateScoreInfo(infoName, infoValue);
    const updatedState = Object.assign(editorInfo, {[infoName]: infoValue});
    setEditorInfo(updatedState);
  };
  const editorChange = (editor, data, value) => {
    const notes = ConvertTextToNotes(value);
    props.updateScoreNotes(notes);
  };
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
      <select className="form-control" id="signature" name="signature" onChange={infoChange} defaultValue="Major">
        <option value="Major">Major</option>
        <option value="Minor">Minor</option>
      </select>
    </div>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Scale</span>
      </div>
      <select className="form-control" id="scale" name="scale" onChange={infoChange} defaultValue="C">
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
    <div className="input-group">
      <div className="input-group">
        <p className="input-group-text">Notes</p>
      </div>
      <br />
      <div style={{textAlign: "left"}}>
        <CodeMirror defaultValue={ConvertNotesToText(props.notes)} options={codeMirrorOptions} onChange={editorChange} />
      </div>
    </div>
  </div>);
};

MusicTextEditor.propTypes = {
  musicInfo: PropTypes.object,
  notes: PropTypes.array,
  updateScoreInfo: PropTypes.func,
  updateScoreNotes: PropTypes.func
};

const mapStateToProps = (state) => {
  const {musicInfo, notes} = state.music;
  return {musicInfo, notes};
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateScoreInfo: (name, value) => {
      dispatch(musicActions.updateScoreInfo(name, value));
    },
    updateScoreNotes: (notes) => {
      dispatch(musicActions.updateScoreNotes(notes));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicTextEditor);