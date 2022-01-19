import React, { useState, useEffect } from 'react';
import {useDispatch } from 'react-redux';
import * as musicActions from '../../actions/musicActions';
import {fetchDataWithAccessToken} from '../../api/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './score-list.scss';

const ScoreList = ({category, reqPath}) => {
  const dispatch = useDispatch();
  let [scoreState, setScoreState] = useState({status:0, scores:[]}); //loading

  const loadScores = async () => {
    const {err, scores} = await fetchDataWithAccessToken(reqPath, 'GET');
    if (err) {
      setScoreState({status:1, scores:[]}); // error
    } else {
      // send scores to redux
      dispatch(musicActions.setScoreList({[category]: scores}));
      setScoreState({status:-1, scores}); // success
    }
  }

  const scoreListClick = (evt) => {
    evt.stopPropagation();
    const scoreId = evt.target.id;
    dispatch(musicActions.setScore(category, scoreId));
  }
  useEffect(() => {
    loadScores();
  }, [])

  let spinner = <span className='loading'><FontAwesomeIcon icon='spinner' size='4x' spin /></span>
    
  let scoreList = scoreState.scores.length > 0 ?
    <div className='list-group score-list' onClick={scoreListClick}>
      {
        scoreState.scores.map(score=>{
          let {_id, title, author, notes} = score;
          let notesLineNum = notes ? notes.length : 0;
          return <button key={_id} id={_id} type='button'
            className='list-group-item list-group-item-action score-item'
            title={`${title}-${author} (${notesLineNum} lines)`}
            >{title}</button>
        })
      }
    </div> :
    <div className='score-list-empty'>
      <span>No scores at present</span>
    </div>;
  return (
    <div>
      <div>
        {scoreState.status == 0 && spinner}
        {scoreState.status == -1 && scoreList}
      </div>
    </div>
  );
}

export default ScoreList;
