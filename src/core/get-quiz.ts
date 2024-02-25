import Quiz from "../models/Quiz";
import { log } from "./log";

async function getQuiz(id: string) {
	// TODO: validation and sanitization
	const document = await Quiz.findById(id);
	const quiz = JSON.parse(JSON.stringify(document));
	// check if can't find quiz
	if (!quiz) {
		return null;
	}
	// additionally, create quiz ready to play
	let questionNumber = 0;
	for (const question of quiz.questions) {
		question.questionNumber = ++questionNumber;
	}
	return quiz;
}

export { getQuiz };
