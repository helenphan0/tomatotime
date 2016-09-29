import React from 'react';
import { Link } from 'react-router';

const Score = React.createClass({
	render(){
		return (
			<div className='score'>
					<h3>Your Score:</h3>
					<h4>{this.props.score}</h4>
					<p>A number countdown happens here</p>
			</div>
		)
	}
});

export default Score;