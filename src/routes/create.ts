import express from "express";
const router = express.Router();

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

const scripts = [{ script: "/js/create.js" }];

router.get("/create", limiter, (request, response) => {
	response.render("create", { scripts: scripts });
});

export { router };
