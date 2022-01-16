import React from 'react';

const TwoDPointsDisp = ({points, editable, width, height})=>{
  let isDisable = !editable;
  points = points || [];
  const pointsDisp = points.map((p, idx)=>{
    const [x, y] = p;
    return (<div key={'P_2D'+idx} className='form-row' style={{marginBottom:'6px'}}>
      <input className='form-control form-control-sm' key={'P_2DX'+idx} type='number' min='0' max='1' step='0.01' style={{width:'70px'}} disabled={isDisable} value={x} />
      <div style={{display:'inline-block'}}>&nbsp;&nbsp;--&nbsp;&nbsp;</div>
      <input className='form-control form-control-sm' key={'P_2DY'+idx} type='number' min='0' max='1' step='0.01' style={{width:'70px'}} disabled={isDisable} value={y} />
    </div>);
  });
  return (<div style={{width, height, overflowX:'hidden', overflowY:'auto', paddingLeft:'10px'}}>
    {pointsDisp}
  </div>);
};

export default TwoDPointsDisp;
