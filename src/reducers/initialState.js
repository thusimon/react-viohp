/**
 * Created by Lu on 8/9/2018.
 */
import * as MusicConstants from '../components/musicStaff/Constants';

export const courseInitState = {
  authors:[],
  courses:[],
  ajaxCallsInProgress: 0
};

export const musicInitState = {
  notes:[],
  scaleHead:MusicConstants.SHARPFLATIDX['Major']['C']
};
