import { getQuiz } from "./get-quiz";

async function checkQuizAnswers(quizID: string, body: any) {
	// validation
	const quiz = await getQuiz(quizID);
	const result = {
		score: 0,
		results: "",
	};
	if (!quiz || !body) {
		return result;
	}

	// check answers
	for (let i = 0; i < quiz.questions.length; i++) {
		const answerToQuestion = body[`question-number--${i + 1}`];
		if (answerToQuestion === quiz.questions[i].correctAnswer) {
			result.score++;
			result.results += "✓";
		} else {
			result.results += "✗";
		}
	}

	// record results
	// (if user entered name)
	if (body.name) {
		quiz.results.push({
			name: body.name,
			score: result.score,
			dateAndTime: Date.now(),
		});
	}

	return result;
}

export { checkQuizAnswers };
