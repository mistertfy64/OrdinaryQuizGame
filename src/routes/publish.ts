import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

import rateLimit from "express-rate-limit";
import { validateNewQuiz } from "../core/validate";
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
		response.send("Unable to create quiz. (Failed validation)");
	}
	response.send("Quiz published!");
});

export { router };
