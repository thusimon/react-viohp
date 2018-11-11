import React from 'react';
import PropTypes from 'prop-types';

class LoadingDots extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      frame: 1
    };
  }

  componentDidMount() {
    console.log("loading dots did mount");
    this.interval = setInterval(()=>{
      this.setState({
        frame: (this.state.frame % this.props.length) +1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let text = this.props.pattern.repeat(this.state.frame);
    return (
      <span {...this.props}>{text}&nbsp;</span>
    );
  }
}

LoadingDots.propTypes = {
  pattern: PropTypes.string,
  interval: PropTypes.number,
  length: PropTypes.number
};

LoadingDots.defaultProps = {
  interval: 300,
  length: 3,
  pattern: '.'
};
export default LoadingDots;
