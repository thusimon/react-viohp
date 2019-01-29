/**
 * Created by Lu on 11/10/2018.
 */
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import * as scores from './Score_fav';
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
  for (let key in scores){
    let curScore = scores[key];
    let {name, title, author} = curScore;
    if (name==scoreName){
      return new Score(curScore)
    }
  }
  return null;
};
