import sanitizeHtml from "sanitize-html";

function validateNewQuiz(body: { [key: string]: any }) {
	// The quiz must have
	// - TODO: The quiz name
	// - Greater than 0 and up to 100 questions
	// A question must have
	// - Question text (can be empty)
	// - A correct answer (CAN NOT be empty)
	// - 4 Answer texts (can be empty)

	if (body.questions.length > 100) {
		return false;
	}

	for (const question of body.questions) {
		if (!question.correctAnswer) {
			return false;
		}
		if (!/answer[1-4]/gm.test(question.correctAnswer)) {
			return false;
		}
	}

	return true;
}

function sanitizeNewQuiz(body: { [key: string]: any }) {
	const cleanQuiz = JSON.parse(JSON.stringify(body));
	for (const question of cleanQuiz) {
		// sanitize the question text
		question.question = sanitizeHtml(question.question);
		// sanitize the answer texts
		for (let a = 1; a <= 4; a++) {
			question.answers[a] = sanitizeHtml(question.answers[a]);
		}
	}
	return cleanQuiz;
}

export { validateNewQuiz };
