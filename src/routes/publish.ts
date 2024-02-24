import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
	max: 100,
	windowMs: 15 * 60 * 1000,
	standardHeaders: true,
	legacyHeaders: false,
});

router.post("/publish", jsonParser, limiter, (request, response) => {
	console.log(request.body);
	response.send("Quiz published!");
});

export { router };
