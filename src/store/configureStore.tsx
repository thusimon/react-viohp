/**
 * Created by Lu on 8/12/2018.
 */
import devStore from './configureStore.dev';
import prodStore from './configureStore.prod';

let store:any;
if (process.env.NODE_ENV === 'production'){
  store = prodStore;
} else {
  store = devStore;
}

export default store;
