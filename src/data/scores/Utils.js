/**
 * Created by Lu on 11/10/2018.
 */
import * as scores from './Score_fav_v2';
import * as scoresTemplate from './Score_template';
import Score from './Score';

export const getAllScoreList = () => {
  let scoreList = [];
  for (let key in scores){
    let curScore = scores[key];
    let {name, title, author} = curScore;
    scoreList.push({name, title, author});
  }
  return scoreList;
};

export const getScoreByName = (scoreName)=>{
  // extend scores and scoresTempate
  const allScores = Object.assign({}, scores, scoresTemplate);
  for (let key in allScores){
    let curScore = allScores[key];
    let {name} = curScore;
    if (name==scoreName){
      return new Score(curScore);
    }
  }
  return null;
};
