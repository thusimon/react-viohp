/**
 * Created by Lu on 11/8/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
const MusicStaffHead = ({musicInfo})=>{
  return (
    <div>
      <div style={{textAlign:"center", width:"100%", fontSize:"22px", fontWeight:"bold"}}>
        {musicInfo.title}
      </div>
      <div style={{textAlign:"right", width:"100%", fontSize:"14px", paddingRight:"20px"}}>
        {musicInfo.author}
      </div>
    </div>
  );
};

MusicStaffHead.propTypes = {
  musicInfo: PropTypes.object
};

export default MusicStaffHead;
