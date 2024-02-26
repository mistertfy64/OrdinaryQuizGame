import sanitizeHtml from "sanitize-html";

function sanitizeNewQuiz(body: { [key: string]: any }) {
	const cleanQuiz = JSON.parse(JSON.stringify(body));

	// name
	cleanQuiz.name = sanitizeHtml(cleanQuiz.name);

	// contact info
	cleanQuiz.contactInformation = sanitizeHtml(cleanQuiz.contactInformation);

	// questions
	for (const question of cleanQuiz.questions) {
		// sanitize the question text
		question.question = sanitizeHtml(question.question);
		// sanitize the answer texts
		for (let a = 1; a <= 4; a++) {
			question.answers[a] = sanitizeHtml(question.answers[a]);
		}
	}

	// additional info
	cleanQuiz.creationDateAndTime = Date.now();

	return cleanQuiz;
}

export { sanitizeNewQuiz };
