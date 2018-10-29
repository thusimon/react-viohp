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
  notes:{},
  markNotes:[],
  scaleHead:MusicConstants.SHARPFLATIDX['Major']['C'],
  dragInfo: {dragStatus:-1, dragNoteName:"C", startOffSet:[0,0], noteShift:[0,0]},
  signature : 'Major',
  scale : 'C'
};
