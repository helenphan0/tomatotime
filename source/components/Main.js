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
var seconds = 1;
var tempState = {};
const defaultPoster = './source/img/default_poster.jpg';

// react router - top score, leaderboard
// redux 
// stop at 10 movies

const Main = React.createClass({
	getInitialState: function () {
	    return {
	      game:  false,
	      ratingInput: false,
	      timeInput: false,
	      posterTitle: '',
	      posterUrl: '',
	      rating: '',
	      time: '',
	      score: 0
	    };
  	},
  	getMovie: function() {
  		console.log('getting new movie');
  		this.setState({ ratingInput: false, timeInput: false });
		var page = getRandomInt(1, 150);
		var searchurl = 'https://api.themoviedb.org/3/movie/popular?api_key=342d326aba75ee271f3e2cb0fbfa3584&language=en-US&page=' + page;
		return fetch(searchurl)
	      	.then((response) => response.json())
	      	.then((responseJson) => {
		     	var oneMovie = responseJson.results[getRandomInt(0, responseJson.results.length)];
		     	console.log(oneMovie);

		     	// set temp state here
		     	tempState.posterUrl = 'https://image.tmdb.org/t/p/w320' + oneMovie.poster_path;
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
		      			rating = (rating === 'N/A' || rating === 'null' || !rating ? getRandomInt(1, 9) + '.' + getRandomInt(1,10) : rating);

		      			var time = showMovie.Runtime;
		      			time = (time === 'N/A' || time === 'null' || !time ? getRandomInt(1, 160) + ' min' : time);

		      			//add to temp state before setting state
						tempState.rating = rating;
						tempState.time = time;
						this.setState(tempState);
		      		//	this.setState({ rating: rating, time: time});
		      			return showMovie;
	      			});
	      	}) 
      	.catch((error) => {
        	console.error(error);
	     });
  	},
  	addScore: function(add) {
  		var score = this.state.score;
  		console.log('SCORE IS: ' + seconds);

  		if (this.state.timeInput == true && this.state.ratingInput == true) {
  			console.log('call new game here');
  		};
  		this.setState({ score: score += parseInt(seconds)});

  	},
  	disable: function(type) {
  		this.setState({ [type]: true });
  	},
  	getTimer: function(timer) {
  		seconds = timer;
  	},
	render() {
		var initialTime = 10000;
		return (
			<div className='main'>
				<h1>TomatoTime!</h1>
				< Poster getMovie={this.getMovie}  url={this.state.posterUrl} title={this.state.posterTitle} />
				<div className='right'>
					< Score score={this.state.score} />
					< CountdownTimer completeCallback={this.getMovie} tickCallback={this.getTimer} initialTimeRemaining={initialTime} />
					< Guess disable={this.disable} addScore={this.addScore} rating={this.state.rating} time={this.state.time} ratingInput={this.state.ratingInput} timeInput={this.state.timeInput} />
				</div>
			</div>
		)
	}
});

export default Main;