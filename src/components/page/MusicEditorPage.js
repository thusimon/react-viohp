import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MusicStaff from '../musicStaff/MusicStaff';
import {getAllScoreList} from '../../data/scores/Utils';
import ScorePicker from '../Scores/ScorePicker';
import * as musicActions from '../../actions/musicActions';
import MusicStaffHead from '../musicStaff/MusicStaffHead';
import MusicTextEditor from '../musicEditor/MusicTextEditor';

class MusicEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.setScoreName('newScore');
    let scoreList = getAllScoreList();
    props.setScoreList(scoreList);
  }
  render() {
    const notesLineCount = this.props.notes.length;
    return (<div style={{width: "100%", display:"flex"}}>
      <div style={{flexBasis:"10%", textAlign:"center", paddingTop: "15px", margin:"10px"}}>
        <ScorePicker />
      </div>
      <div style={{flexBasis:"30%", textAlign:"center", margin:"10px"}}>
        <p className="badge badge-info" style={{fontSize:'14px', marginTop: "15px"}}>Editor</p>
        <MusicTextEditor />
      </div>
      <div style={{flexBasis:"60%", textAlign:"center", margin:"10px"}}>
        <p className="badge badge-info" style={{fontSize:'14px', marginTop: "15px"}}>Score</p>
        <MusicStaffHead musicInfo={this.props.musicInfo}/>
        <div style={{overflowX:"hidden", overflowY:"scroll"}}>
          {Array.from(Array(notesLineCount).keys()).map(n =>
              <MusicStaff key={n.toString()} idx={n} />
          )}
        </div>
      </div>
    </div>);
  }
}

MusicEditorPage.propTypes = {
  musicInfo: PropTypes.object,
  notes: PropTypes.array,
  setScoreList: PropTypes.func,
  setScoreName: PropTypes.func
};

const mapStateToProps = (state) => {
  let {musicInfo, notes} = state.music;
  return {musicInfo, notes};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreList:(scoreList) => {
      dispatch(musicActions.setScoreList(scoreList));
    },
    setScoreName: (id) => {
      dispatch(musicActions.setScore(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicEditorPage);