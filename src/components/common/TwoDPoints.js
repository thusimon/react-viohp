import React from 'react';
import PropTypes from 'prop-types';

const TwoDPointsDisp = ({points, editable, width, height})=>{
    let isDisable = (!editable).toString();
    points = points || [];
    let pointsDisp = points.map((p, idx)=>{
        let [x, y] = p;
        return <div key={"P_2D"+idx} className="form-row" style={{marginBottom:"6px"}}>
            <input className="form-control form-control-sm" key={"P_2DX"+idx} type='number' min="0" max="1" step="0.01" style={{width:"70px"}} disabled={isDisable} value={x} />
            <div style={{display:"inline-block"}}>&nbsp;&nbsp;--&nbsp;&nbsp;</div>
            <input className="form-control form-control-sm" key={"P_2DY"+idx} type='number' min="0" max="1" step="0.01" style={{width:"70px"}} disabled={isDisable} value={y} />
        </div>
    })
    return <div style={{width, height, overflowX:"hidden", overflowY:"auto", paddingLeft:"10px"}}>
        {pointsDisp}
    </div>
}

TwoDPointsDisp.propTypes = {
    points: PropTypes.array.isRequired,
    editable: PropTypes.bool.isRequired
}

export default TwoDPointsDisp;