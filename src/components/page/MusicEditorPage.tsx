import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import toastr from 'toastr';
import * as musicActions from '../../actions/musicActions';
import * as modalActions from '../../actions/modalActions';
import ScorePickerModal from '../modal/ScorePickerModal';
import AudioPlayer from '../audio/AudioPlayer';
import MusicTextEditor from '../musicEditor/MusicTextEditor';
import MusicStaff from '../musicStaff/MusicStaff';
import {fetchDataWithAccessToken} from '../../api/utils';
import { RootState } from '../../reducers/initialState';

import './music-editor-page.scss';

const MusicEditorPage = () => {
  const musicEditorProps = useSelector((state: RootState) => ({
    score:state.score,
    auth:state.auth
  }));
  const dispatch = useDispatch();

  const pickScore = () => {
    dispatch(modalActions.toggleScorePicker());
  };
  const createNewScore = () => {
    dispatch(musicActions.resetScore());
  };
  const saveScore = async () => {
    // prepare the data
    const data = {
      title: musicEditorProps.score.scoreInfo.title,
      author: musicEditorProps.score.scoreInfo.author,
      signature: musicEditorProps.score.scoreInfo.signature,
      scale: musicEditorProps.score.scoreInfo.scale,
      notes: musicEditorProps.score.notesToSave,
      owner: null,
      order: 0
    }
    // get the id first
    const id = musicEditorProps.score.id;
    try {
      if (id) {
        // has id, should be update
        await fetchDataWithAccessToken(`/api/score/me/:id/${id}`, 'PATCH', data);
      } else {
        // no id, should be create new
        data.owner = musicEditorProps.auth.user._id;
        // private list
        const privateScores = musicEditorProps.score.scoreList ? musicEditorProps.score.scoreList['private'] : [];
        data.order = privateScores.length;
        await fetchDataWithAccessToken(`/api/score/me`, 'POST', data);
      }
      toastr.success('successfully saved score');
    } catch (e){
      toastr.error('failed to save score');
    }
  };
  const saveBtnDisable = musicEditorProps.auth.user ? false : true;
  const saveBtnTitle = saveBtnDisable ? 'Please login to save your scores.' : 'Save current score';
  return (
    <div className="music-editor-page">
      <div className="control-section">
        <div className="score-picker-button">
          <button type="button" className="btn btn-outline-primary btn-xs" onClick={pickScore}
            title='Select a score'>Pick Score</button>
          <ScorePickerModal />
        </div>
        <div className="new-score-button">
          <button type="button" className="btn btn-outline-primary btn-xs" onClick={createNewScore}
            title='Create an empty score'>New</button>
        </div>
        <div className="save-score-button">
          <button type="button" className="btn btn-outline-primary btn-xs" onClick={saveScore}
            disabled={saveBtnDisable} title={saveBtnTitle}>Save</button>
        </div>
        <div className="player-section">
          <AudioPlayer />
        </div>
      </div>
      <div className="editor-section">
        <div className="editor-section-container">
          <MusicTextEditor />
        </div>
      </div>
      <div className="score-section">
        <MusicStaff />
      </div>
    </div>
  );
}

export default MusicEditorPage;
