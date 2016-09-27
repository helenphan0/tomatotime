import React from 'react';
import { Link } from 'react-router';

const Guess = React.createClass({
	tomatoGuess: function(e){
		e.preventDefault();
		var tomato = this.refs.rating.value;
		console.log('tomato guess is: ' + tomato);
		this.refs.guessForm.reset();
	},
	timeGuess: function(e){
		e.preventDefault();
		var duration = this.refs.time.value;
		console.log('time guess is: ' + duration);
		this.refs.guessForm.reset();
	},
	render(){
		return (
			<div className="guess">
				<form ref="guessForm">
					<h4>This is a form for guessing</h4>
					<input type="text" ref="rating" placeholder="3.14" />
					<button onClick={this.tomatoGuess} type="submit">Rotten Tomatoes</button>
					<input type="text" ref="time" placeholder="60" />
					<button onClick={this.timeGuess} type="submit">Movie Length</button>
				</form>
			</div>
		)
	}
});

export default Guess;