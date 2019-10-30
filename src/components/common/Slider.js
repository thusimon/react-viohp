/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Slider = ({start, end, onSlide, initVal = 0}) => {
  const [sliderState, setSliderState] = useState({val: initVal*(end-start)+start});
  const sliderOnInput = (evt) => {
    const val = evt.target.value;
    const valPercent = (parseFloat(val)-start)/(end-start);
    onSlide(valPercent);
    setSliderState({val});
  };
  return (
  <div>
    <input type="range" min={start} max={end} defaultValue={sliderState.val} className="slider" onInput={sliderOnInput} />
    <span className="sliderVal">{sliderState.val}</span>
  </div>
  );
};

Slider.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  initVal: PropTypes.number,
  onSlide: PropTypes.func
};

export default Slider;