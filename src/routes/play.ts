import express from "express";
const router = express.Router();

import rateLimit from "express-rate-limit";
import { getQuiz } from "../core/get-quiz";
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

router.get("/play/:id", limiter, async (request, response) => {
	const quiz = await getQuiz(request.params.id);
	if (quiz) {
		response.render("play", {
			questions: quiz.questions,
			quizID: request.params.id,
			quizName: quiz.name,
		});
	} else {
		response.send("404");
	}
});

export { router };
