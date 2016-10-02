import React from 'react';
import { Link } from 'react-router';
import Poster from './Poster';
import Guess from './Guess';
import Score from './Score';
import CountdownTimer from './CountdownTimer';
import fetch from 'isomorphic-fetch';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
 };

var id;
var showMovie;
var seconds = 0;
var tempState = {};
var counter = 0;
var buttonDisabled = {
	ratingInput: false,
	timeInput: false,
};
const defaultPoster = './source/img/default_poster.jpg';
const introPoster = './source/img/intro_poster.png';
const endPoster = './source/img/end_poster.png';

// react router - top score, leaderboard
// redux 

// correct guess doesn't need to be exact..
// rating 1 - .1 75% 
// divide by half, 35%, etc

// move start button underneath title
// fix restart button appearance (hide/unhide)

const Main = React.createClass({
	getInitialState: function () {
	    return {
	      game: 0,
	      gameState: false,
	      ratingInput: false,
	      timeInput: false,
	      posterTitle: '',
	      posterUrl: introPoster,
	      rating: '',
	      time: '',
	      score: 0
	    };
  	},
  	getMovie: function() {
  		console.log('getting new movie');
  		buttonDisabled	= {
			ratingInput: false,
	      	timeInput: false
		};
		counter += 1;
  		this.setState({ game: counter, ratingInput: false, timeInput: false });
		var page = getRandomInt(1, 80);
		var searchurl = 'https://api.themoviedb.org/3/movie/popular?api_key=342d326aba75ee271f3e2cb0fbfa3584&language=en-US&page=' + page;
		return fetch(searchurl)
	      	.then((response) => response.json())
	      	.then((responseJson) => {
		     	var oneMovie = responseJson.results[getRandomInt(0, responseJson.results.length)];
		     	console.log(oneMovie);

		     	// set temp state here
		     	if (oneMovie.poster_path == null) {
		     		tempState.posterUrl = defaultPoster;
		     	}
		     	else {
		     		tempState.posterUrl = 'https://image.tmdb.org/t/p/w300' + oneMovie.poster_path;		     		
		     	};
		     	tempState.posterTitle = oneMovie.title;

		     //	this.setState({ posterUrl: 'https://image.tmdb.org/t/p/w320' + oneMovie.poster_path, posterTitle: oneMovie.title});
	      	})
	      	.then((movieDetail) => {

		    	console.log(tempState.posterTitle);
		      	let detailUrl =  'https://www.omdbapi.com/?t=' + tempState.posterTitle + '&plot=full&type=movie&tomatoes=true&r=json';
		      	fetch(detailUrl)
		      		.then((resp) => resp.json())
		      		.then((respJson) => {
		      			showMovie = respJson;
		      			console.log(showMovie);

		      			var rating = showMovie.tomatoRating;
		      			rating = (rating === 'N/A' ? showMovie.imdbRating : rating);
		      			rating = (rating === 'N/A' || rating == null || !rating ? getRandomInt(1, 8) + '.' + getRandomInt(1,10) : rating);

		      			var time = showMovie.Runtime;
		      			time = (time === 'N/A' || time == null || !time ? getRandomInt(1, 160) + ' min' : time);

		      			//add to temp state before setting state
						tempState.rating = rating;
						tempState.time = time;
						this.setState(tempState);

		      			return showMovie;
	      			});
	      	}) 
      	.catch((error) => {
        	console.error(error);
	     });
  	},
  	addScore: function(answer) {
  		var score = this.state.score;
  		console.log(answer);
  		var calcScore = parseInt(seconds) * answer.multiplier;
  		calcScore = Math.round(calcScore);
  		console.log('SCORE IS: ' + calcScore);
  		this.setState({ score: score += calcScore });
  	},
  	disable: function(type) {
  		buttonDisabled[type] = true,
  		console.log(buttonDisabled);
  		this.setState({ [type]: true });
  	},
  	getTimer: function(timer) {
  		seconds = timer;  	
  	},
  	endGame: function() {
  		seconds = 0;
  		this.setState({ 
  		 	posterTitle: '', 
  		 	posterUrl: endPoster, 
  		 	gameState: true,
  		 	rating: '',
		    time: ''
  		});
  	},
  	restart: function() {
  		tempState = {};
  		counter = 0;
  		this.setState({
  			game: 0,
  			gameState: false,
		    ratingInput: false,
		    timeInput: false,
		    posterTitle: '',
		    posterUrl: introPoster,
		    rating: '',
		    time: '',
		    score: 0
  		});
  	},
	render() {
		var initialTime = (counter == 0 || this.state.gameState == true ? 0 : 20000);
		var mainTitle = false;
		if ( this.state.game != 0 && this.state.gameState != true) {
			mainTitle = true;
		}
		return (
			<div className='main'>
				<div className='top'>
					<h1 className={ mainTitle ? 'title' : 'hidden'}>TomatoTime!</h1>
					<button onClick={this.getMovie} className={this.state.game != '0' ? 'hidden' : ''} type='button'>Begin</button>
					<button onClick={this.restart} className={this.state.gameState ? '' : 'hidden'} type='button'>Reset Game</button>
				</div>
				< Poster 
					getMovie={counter == '10' ? this.endGame : this.getMovie} 
					url={this.state.posterUrl} 
					title={this.state.posterTitle} 
				/>
				<div className='right'>
					< Score score={this.state.score} />
					< CountdownTimer 
						completeCallback={counter == '10' ? this.endGame : this.getMovie} 
						tickCallback={this.getTimer} 
						initialTimeRemaining={initialTime} 
					/>
					< Guess 
						game={this.state.game} 
						disable={this.disable} 
						addScore={this.addScore}
						getMovie={counter == '10' ? this.endGame : this.getMovie}  
						rating={this.state.rating} 
						time={this.state.time} 
						ratingInput={this.state.ratingInput} 
						timeInput={this.state.timeInput} 
					/>
				</div>
			</div>
		)
	}
});

export default Main;