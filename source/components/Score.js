import React from 'react';
import { Link } from 'react-router';

const Score = React.createClass({
	render(){
		return (
			<div className='score'>
					<h3>Your Score</h3>
					<h3>{this.props.score}</h3>
			</div>
		)
	}
});

export default Score;