/**
 * Created by Lu on 8/12/2018.
 */
import expect from 'expect';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import {courseInitState as initState} from '../reducers/initialState';
import * as audioActions from '../actions/audioActions';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

describe('Store test', ()=>{
  it('Store should handle save audio settings', (done) => {
    const store = createStore(
      rootReducer,
      initState,
      applyMiddleware(thunk, reduxImmutableStateInvariant())
    );

    const [threshold, tolerance, freqRange] = [100, 5, [100,900]];
    const action = audioActions.saveSettings(threshold, tolerance, freqRange);

    store.dispatch(action);
    const actualState = store.getState();
    expect(actualState.audio.threshold).toBe(threshold);
    expect(actualState.audio.tolerance).toBe(tolerance);
    expect(actualState.audio.freqRange).toEqual(freqRange);
    done();
  }).timeout(10000);
});
