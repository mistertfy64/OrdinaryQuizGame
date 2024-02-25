import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

import rateLimit from "express-rate-limit";
import { validateNewQuiz } from "../core/validate";
import { sanitizeNewQuiz } from "../core/sanitize";
import { addQuiz } from "../core/add-quiz";
import { log } from "../core/log";

const limiter = rateLimit({
	max: 100,
	windowMs: 15 * 60 * 1000,
	standardHeaders: true,
	legacyHeaders: false,
});

router.post("/publish", jsonParser, limiter, (request, response) => {
	const body = request.body;
	console.log(body);
	if (!validateNewQuiz(body)) {
		response.send("Unable to publish quiz. (Failed validation)");
	}
	const cleanQuiz = sanitizeNewQuiz(body);
	const quizID = addQuiz(cleanQuiz);
	if (quizID == null) {
		response.send("Unable to publish quiz.");
	}
	log.info(`New quiz with ID ${quizID} is created.`);
	response.send(`Quiz published! (as ID ${quizID})`);
});

export { router };
