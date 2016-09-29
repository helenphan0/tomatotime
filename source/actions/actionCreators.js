// track score
export function updateScore(score) {
	return {
		type: 'UPDATE_SCORE',
		score
	}
}

// guess rotten tomato rating
export function guessRating(rating) {
	return {
		type: 'GUESS_TOMATO',
		rating,
	}
}

// guess movie duration of movie
export function guessTime(time) {
	return {
		type: 'GUESS_LENGTH',
		time
	}
}


export function fetchMovieSuccess(movie, rating, time) {
    return {
        type: FETCH_MOVIE_SUCCESS,
        movie,
        rating,
        time
    };
};


export function fetchMovieError(movie, error) {
    return {
        type: FETCH_MOVIE_ERROR,
        movie,
        error
    };
};