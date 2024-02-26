import { getQuiz } from "./get-quiz";

async function recordAnswer(quizID: string, data: { [key: string]: any }) {
	const quiz = await getQuiz(quizID, true);
	if (!quiz || !data) {
		return;
	}
	quiz.results.push(data);
	quiz.save();
}

export { recordAnswer };
