import React from 'react';

// make a function this.setState timer: setState

var CountdownTimer1 = React.createClass({
  getInitialState: function() {
    return {
      game: false,
      secondsRemaining: 0
    };
  },
  tick: function() {
  	if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
    else {
    	this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    	var seconds = this.state.secondsRemaining;
    	this.sendTick(seconds);
    };
  },
  componentWillReceiveProps: function(nextProps) {
	this.setState({ secondsRemaining: this.props.secondsRemaining });
	this.interval = setInterval(this.tick, 1);
  },
  sendTick: function(seconds) {
  this.props.getTimer(seconds);
  	
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <h3 >Seconds Remaining: {this.state.secondsRemaining} </h3>
    );
  }
});


export default CountdownTimer1;