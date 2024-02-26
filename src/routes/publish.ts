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

router.post("/publish", jsonParser, limiter, async (request, response) => {
	const body = request.body;
	if (!validateNewQuiz(body)) {
		response.send("Unable to publish quiz. (Failed validation)");
	}
	const cleanQuiz = await sanitizeNewQuiz(body);
	const quizID = await addQuiz(cleanQuiz);
	if (quizID == null) {
		response.json({ ok: false });
	}
	log.info(`New quiz with ID ${quizID} is created.`);
	response.json({ ok: true, quizID: quizID });
});

export { router };
