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
	for (let i = 0; i < quiz.questions.length; i++) {
		const answerToQuestion = body[`question-number--${i + 1}`];
		if (answerToQuestion === quiz.questions[i].correctAnswer) {
			result.score++;
			result.results += "✓";
		} else {
			result.results += "✗";
		}
	}
	return result;
}

export { checkQuizAnswers };
