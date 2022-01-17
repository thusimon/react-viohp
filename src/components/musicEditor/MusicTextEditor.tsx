/* eslint-disable react/jsx-no-bind */
import React from 'react';
import NoteEditor from './NoteEditor';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../reducers/initialState';
import * as musicActions from '../../actions/musicActions';
import './music-text-editor.scss';


const MusicTextEditor = () => {
  const scoreProps = useSelector((state: RootState) => state.score);
  const dispatch = useDispatch();
  const infoChange = (evt) => {
    const target = evt.target;
    const infoName = target.id;
    const infoValue = target.value;
    dispatch(musicActions.updateScoreInfo(infoName, infoValue));
  };

  const signautreValue = scoreProps.scoreInfo.signature ? scoreProps.scoreInfo.signature : 'Major';
  const scaleValue = scoreProps.scoreInfo.scale ? scoreProps.scoreInfo.scale : 'C';
  return (
  <div className="music-text-editor-main">
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Title</span>
      </div>
      <input type="text" className="form-control" id="title" name="title" value={scoreProps.scoreInfo.title} onChange={infoChange}/>
    </div>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Author</span>
      </div>
      <input type="text" className="form-control" id="author" name="author" value={scoreProps.scoreInfo.author} onChange={infoChange}/>
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

export default MusicTextEditor;
