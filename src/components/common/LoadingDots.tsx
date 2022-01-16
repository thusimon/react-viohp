import React, { useState, useEffect } from 'react';

const LoadingDots = (props) => {
  const [loadingState, setLoadingState] = useState({ frame: 1 });
  useEffect(() => {
    const timer = setInterval(()=>{
      setLoadingState({
        frame: (loadingState.frame % props.length) + 1
      });
    }, props.interval);

    return () => {
      if(timer) {
        clearInterval(timer);
      }
    }
  });
  const text = props.pattern.repeat(loadingState.frame);
  return (
    <span {...props}>{text}&nbsp;</span>
  );
}

export default LoadingDots;
