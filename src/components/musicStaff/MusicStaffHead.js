/**
 * Created by Lu on 11/8/2018.
 */
import React from 'react';

const MusicStaffHead = ({musicInfo})=>{
  return (
    <div>
      <div style={{textAlign:"center", width:"100%", fontSize:"22px", fontWeight:"bold"}}>
        {musicInfo.title}
      </div>
      <div style={{textAlign:"right", width:"100%", fontSize:"14px"}}>
        {musicInfo.author}
      </div>
    </div>
  );
};

export default MusicStaffHead;
