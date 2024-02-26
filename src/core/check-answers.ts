import sanitizeHtml from "sanitize-html";
import { getQuiz } from "./get-quiz";
import { recordAnswer } from "./record-answer";

async function checkQuizAnswers(quizID: string, body: any) {
	// validation
	const quiz = await getQuiz(quizID);
	const result = {
		score: 0,
		results: "",
		name: "",
		total: 0,
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
	// (if user entered name and its less than 512 chars)
	if (body.name && body.name.length <= 512) {
		recordAnswer(quizID, {
			name: sanitizeHtml(body.name),
			score: result.score,
			dateAndTime: new Date(),
		});
	}

	// add extra information
	result.name = quiz.name;
	result.total = quiz.questions.length;

	return result;
}

export { checkQuizAnswers };
