/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './slider.scss';

const Slider = ({start, end, onSlide, initVal = 0}) => {
  const [sliderState, setSliderState] = useState({val: initVal*(end-start)+start});
  const sliderOnInput = (evt) => {
    const val = evt.target.value;
    const valPercent = (parseFloat(val)-start)/(end-start);
    onSlide(valPercent);
    setSliderState({val});
  };
  return (
    <span className="slider-container">
      <input type="range" min={start} max={end} defaultValue={sliderState.val} className="slider" onInput={sliderOnInput} />
      <span className="slider-val">{sliderState.val}</span>
    </span>
  );
};

Slider.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  initVal: PropTypes.number,
  onSlide: PropTypes.func
};

export default Slider;