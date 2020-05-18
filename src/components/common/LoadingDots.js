import React from 'react';

class LoadingDots extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      frame: 1
    };
  }

  componentDidMount() {
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

export default LoadingDots;
