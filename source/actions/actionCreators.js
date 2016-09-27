// score
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

// guess movie length
export function guessLength(length) {
	return {
		type: 'GUESS_LENGTH',
		length
	}
}