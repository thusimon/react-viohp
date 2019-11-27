import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MusicStaff from '../musicStaff/MusicStaff';
import * as modalActions from '../../actions/modalActions';
import ScorePickerModal from '../modal/ScorePickerModal';
import AudioPlayer from '../audio/AudioPlayer';
import * as musicActions from '../../actions/musicActions';
import MusicTextEditor from '../musicEditor/MusicTextEditor';
import MusicStaffPage from '../musicStaff/MusicStaffPage';
import './music-editor-page.scss';

class MusicEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.pickScore = this.pickScore.bind(this);
  }
  pickScore() {
    this.props.toggleScorePicker();
  }
  render() {
    return (
      <div className="music-editor-page">
        <div className="control-section">
          <div className="score-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickScore}>Pick Score</button>
            <ScorePickerModal />
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

MusicEditorPage.propTypes = {
  musicInfo: PropTypes.object,
  notes: PropTypes.array
};

const mapStateToProps = (state) => {
  let {musicInfo, notes} = state.music;
  return {musicInfo, notes};
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleScorePicker: () => {
      dispatch(modalActions.toggleScorePicker());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicEditorPage);