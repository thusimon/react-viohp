import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as musicActions from '../../actions/musicActions';
import MusicStaffHead from './MusicStaffHead';
import {Staff} from './staff/staff'
import { RootState } from '../../reducers/initialState';

import './music-staff-container.scss';

const MusicStaff = () => {
  const scoreProps = useSelector((state: RootState) => state.score);
  const dispatch = useDispatch();
  const [activeStaff, setActiveStaff] = useState({
    activeStaff:0
  });

  const staffContainerRef = useRef<HTMLDivElement>();
  const staffRef = useRef<HTMLDivElement>();

  const onMusicStaffPageMouseMove = (event) => {
    const {dragStatus, dragNoteName, startOffSet} = scoreProps.dragInfo;
    if (dragStatus > -1 && staffContainerRef.current){
      //calculate the entire staff page client rect
      const staffContainerRect = staffContainerRef.current.getBoundingClientRect();
      const noteShift = [event.clientX - staffContainerRect.x, event.clientY - staffContainerRect.y];
      const dragInfo = {
        dragStatus: 1,
        dragNoteName,
        startOffSet,
        noteShift
      };
      dispatch(musicActions.noteDrag(dragInfo));
    }
  }

  const onMusicStaffPageMouseUp = () => {
    const {dragNoteName} = scoreProps.dragInfo;
    const dragInfo = {
      dragStatus: -1,
      dragNoteName,
      startOffSet: [0,0],
      noteShift: [0,0]
    };
    dispatch(musicActions.noteDrag(dragInfo));
  }

  return (
    <div className='music-staff-container'
      ref={staffContainerRef}
      onMouseMove={onMusicStaffPageMouseMove}
      onMouseUp={onMusicStaffPageMouseUp}>
      <MusicStaffHead scoreInfo={scoreProps.scoreInfo}/>
      <div className='music-staff-section' ref={staffRef}>
        <Staff sectionRef={staffRef} />
      </div>
    </div>
  );
}

export default MusicStaff;
