import React from 'react';
import MusicStaff from '../musicStaff/MusicStaff';
class MusicEditorPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div style={{width: "100%", display:"flex"}}>
      <div style={{flexBasis:"30%", textAlign:"center"}}>
        <p className="badge badge-info" style={{fontSize:'14px', marginTop: "15px"}}>Editor</p>
        <div style={{display:"flex", flexDirection:"column", height: "100%"}}>
          <textarea style={{overflowY: "scroll", height:"950px"}} />
        </div>
      </div>
      <div style={{flexBasis:"70%", textAlign:"center"}}>
        <p className="badge badge-info" style={{fontSize:'14px', marginTop: "15px"}}>Score</p>
        <MusicStaff />
      </div>
    </div>);
  }
}

export default MusicEditorPage;