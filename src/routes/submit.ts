import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
const urlParser = bodyParser.urlencoded({ extended: true });

import rateLimit from "express-rate-limit";
import { log } from "../core/log";
import { checkQuizAnswers } from "../core/check-answers";

const limiter = rateLimit({
	max: 100,
	windowMs: 15 * 60 * 1000,
	standardHeaders: true,
	legacyHeaders: false,
});

router.post("/submit/:id", urlParser, limiter, async (request, response) => {
	const body = request.body;
	// TODO: request.url method is volatile
	// TODO: validation and sanitization
	const quizID = request.params.id;
	const results = await checkQuizAnswers(quizID, body);
	response.render("results", {
		score: results.score,
		questions: results.results,
		total: results.total,
		name: results.name,
	});
});

export { router };
