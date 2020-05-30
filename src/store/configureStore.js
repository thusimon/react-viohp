/**
 * Created by Lu on 8/7/2018.
 */
import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState){
  return createStore(rootReducer
    , initialState
  );
}
