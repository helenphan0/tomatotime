import React from 'react';
import { Link } from 'react-router';

const Guess = React.createClass({
	tomatoGuess: function(e){
		e.preventDefault();
		var tomato = this.refs.rating.value;
		console.log('tomato guess is: ' + tomato);
		console.log('correct rating: ' + this.props.rating);
		var correctRating = ( tomato === this.props.rating ? true : false);
		if (correctRating){
			this.handleScore();
		};
		this.refs.guessForm.reset();
	},
	timeGuess: function(e){
		e.preventDefault();
		var duration = this.refs.time.value + ' min';
		console.log('time guess is: ' + duration);
		console.log('correct time: ' + this.props.time);
		var correctTime = ( duration === this.props.time ? true : false );
		if (correctTime){
			this.handleScore();
		};
		this.refs.guessForm.reset();
	},
	handleScore: function() {
		this.props.addScore(1);
	},
	render(){
		return (
			<div className='guess'>
				<form ref='guessForm'>
					<h4>This is a form for guessing {this.props.rating} {this.props.time}</h4>
					<input type='text' ref='rating' disabled={this.props.ratingInput} placeholder="Guess 0.0 to 10.0" />
					<button onClick={this.tomatoGuess} type='submit'>Tomatoes</button>
					<input type='text' ref='time' disabled={this.props.timeInput} placeholder='How many minutes?' />
					<button onClick={this.timeGuess} type='submit'>Time</button>
				</form>
			</div>
		)
	}
});

export default Guess;