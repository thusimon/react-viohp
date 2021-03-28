/**
 * Created by Lu on 11/8/2018.
 */
import React from 'react';
const MusicStaffHead = ({scoreInfo})=>{
  return (
    <div className="music-staff-head-container">
      <div style={{textAlign:"center", width:"100%", fontSize:"22px", fontWeight:"bold"}}>
        {scoreInfo.title}
      </div>
      <div style={{textAlign:"right", width:"100%", fontSize:"14px", paddingRight:"20px"}}>
        {scoreInfo.author}
      </div>
    </div>
  );
};

export default MusicStaffHead;
