/**
 * Created by Lu on 11/10/2018.
 */
import * as scores from './Score_fav';
import * as scoresTemplate from './Score_template';
import Score from './Score';

export const getScoreById = (scoreId)=>{
  // extend scores and scoresTempate
  const allScores = Object.assign({}, scores, scoresTemplate);
  for (let key in allScores){
    let curScore = allScores[key];
    let {id} = curScore;
    if (id==scoreId){
      return new Score(curScore);
    }
  }
  return null;
};
