const MAXIMUM_CHARACTERS = 512;

function validateNewQuiz(body: { [key: string]: any }) {
	// The quiz must have
	// The quiz name
	// - Greater than 0 and up to 100 questions
	// A question must have
	// - Question text (can be empty, <= 512 chars)
	// - A correct answer (CAN NOT be empty)
	// - 4 Answer texts (can be empty, <= 512 chars)

	// The quiz must have a name
	if (!body.name) {
		return false;
	}

	// ...and it must not be more than 512 characters
	if (body.name.length > MAXIMUM_CHARACTERS) {
		return false;
	}

	// There must be at least 1 question and at most 100.
	if (body.questions.length > 100 || body.questions.length < 1) {
		return false;
	}

	// Contact information must not be longer than 512 characters
	if (body.contactInformation.length > MAXIMUM_CHARACTERS) {
		return false;
	}

	// For each question...
	for (const question of body.questions) {
		// A question must have an answer
		if (!question.correctAnswer) {
			return false;
		}
		if (!/answer[1-4]/gm.test(question.correctAnswer)) {
			return false;
		}

		// A question may not ber more than 512 characters long
		if (question.question.length > MAXIMUM_CHARACTERS) {
			return false;
		}

		// An answer may not be more than 512 characters long
		for (let i = 0; i < 4; i++) {
			if (question.answers[i].length > MAXIMUM_CHARACTERS) {
				return false;
			}
		}
	}

	return true;
}

/**
 * This validate's a query for a quiz id.
 * THIS DOES NOT ACTUALLY VALIDATE IF A QUIZ EXISTS.
 * @param id The quiz's id
 */
function validateQuizID(id: string) {
	if (!/[0-9a-f]{24}/gm.test(id)) {
		return false;
	}

	if (id.length != 24) {
		return false;
	}

	return true;
}

export { validateNewQuiz, validateQuizID };
