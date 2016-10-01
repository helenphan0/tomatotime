import React from 'react';
import { Link } from 'react-router';

const Score = React.createClass({
	render(){
		return (
			<div className='score'>
					<h2>Your Score</h2>
					<h2 className='score-number' >{this.props.score}</h2>
			</div>
		)
	}
});

export default Score;