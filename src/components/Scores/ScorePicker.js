/**
 * Created by Lu on 11/10/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as musicActions from '../../actions/musicActions';


class ScorePicker extends React.Component {
  constructor(props){
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  onSelectChange(evt){
    let scoreName = evt.target.value;
    this.props.setScoreName(scoreName);
    this.props.initPlayerScore(scoreName);
  }
  render(){
    let scoreList = this.props.scoreList;
    let options = scoreList.map(score=>{
      let {name, title, author} = score;
      let optionText = `${title} - ${author}`;
      return (
       <option key={name} value={name} title={optionText}>{optionText}</option>
      );
    });
    return (
      <div>
        <span className="badge badge-info" style={{fontSize:'12px'}}>Select the score</span>
        <br /><br />
        <select size={scoreList.length}
                onChange={this.onSelectChange} style={{width:"200px"}}>
          {options}
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {scoreList:state.music.scoreList};
}

function mapDispatchToProps(dispatch) {
  return {
    setScoreName: (scoreName)=> {
      dispatch(musicActions.setScore(scoreName));
    }
  };
}

ScorePicker.propTypes = {
  setScoreName: PropTypes.func,
  initPlayerScore: PropTypes.func,
  scoreList: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ScorePicker);
