import Quiz from "../models/Quiz";
import { log } from "./log";
import { validateQuizID } from "./validate";

async function getQuiz(id: string) {
	// TODO: more validation and sanitization

	// check if id is correctly formatted
	if (!validateQuizID(id)) {
		return null;
	}

	const document = await Quiz.findById(id);
	// check if can't find document
	if (!document) {
		return null;
	}
	const quiz = JSON.parse(JSON.stringify(document));
	// additionally, create quiz ready to play
	let questionNumber = 0;
	for (const question of quiz.questions) {
		question.questionNumber = ++questionNumber;
	}
	return quiz;
}

export { getQuiz };
