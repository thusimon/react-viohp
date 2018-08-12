/**
 * Created by Lu on 8/12/2018.
 */
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/';
import thunk from 'redux-thunk';
export default function configureStore(initialState){
  return createStore(rootReducer
    , initialState
    , applyMiddleware(thunk)
  );
}
