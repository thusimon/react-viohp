import React from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';
import * as musicActions from '../../actions/musicActions';
import * as modalActions from '../../actions/modalActions';
import ScorePickerModal from '../modal/ScorePickerModal';
import AudioPlayer from '../audio/AudioPlayer';
import MusicTextEditor from '../musicEditor/MusicTextEditor';
import MusicStaffPage from '../musicStaff/MusicStaffPage';
import {fetchDataWithAccessToken} from '../../api/utils';
import './music-editor-page.scss';

class MusicEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.pickScore = this.pickScore.bind(this);
    this.createNewScore = this.createNewScore.bind(this);
    this.saveScore = this.saveScore.bind(this);
  }
  pickScore() {
    this.props.toggleScorePicker();
  }
  createNewScore() {
    this.props.resetScore();
  }
  async saveScore() {
    // prepare the data
    const data = {
      title: this.props.musicInfo.title,
      author: this.props.musicInfo.author,
      signature: this.props.musicInfo.signature,
      scale: this.props.musicInfo.scale,
      notes: this.props.notesToSave
    }
    // get the id first
    try {
      if (this.props.id) {
        // has id, should be update
        await fetchDataWithAccessToken(`/api/score/me/:id/${this.props.id}`, 'PATCH', data);
      } else {
        // no id, should be create new
        data.owner = this.props.user._id;
        // private list
        const privateScores = this.props.scoreList ? this.props.scoreList['private'] : [];
        data.order = privateScores.length;
        await fetchDataWithAccessToken(`/api/score/me`, 'POST', data);
      }
      toastr.success('successfully saved score');
    } catch (e){
      toastr.error('failed to save score');
    }
  }
  render() {
    const saveBtnDisable = this.props.user ? false : true;
    const saveBtnTitle = saveBtnDisable ? 'Please login to save your scores.' : 'Save current score';
    return (
      <div className="music-editor-page">
        <div className="control-section">
          <div className="score-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickScore}
              title='Select a score'>Pick Score</button>
            <ScorePickerModal />
          </div>
          <div className="new-score-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.createNewScore}
              title='Create an empty score'>New</button>
          </div>
          <div className="save-score-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.saveScore}
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
          <MusicStaffPage />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {id, musicInfo, notes, scoreList, notesToSave} = state.music;
  let {user} = state.auth;
  return {id, musicInfo, notes, notesToSave, scoreList, user};
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleScorePicker: () => {
      dispatch(modalActions.toggleScorePicker());
    },
    resetScore: () => {
      dispatch(musicActions.resetScore());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicEditorPage);
