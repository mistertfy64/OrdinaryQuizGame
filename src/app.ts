import express, { NextFunction, Request, Response } from "express";
import { create } from "express-handlebars";
import { log } from "./core/log";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
import { doubleCsrf } from "csrf-csrf";
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
require("dotenv").config();

// constants
const PORT = 10003;
const app = express();
const handlebars = create({});
const urlParser = bodyParser.urlencoded({ extended: true });

const cookieName =
	process.env.CREDENTIAL_SET_USED != "testing"
		? "__Host-psifi.x-csrf-token"
		: "testing.x-csrf-token";
if (process.env.CREDENTIAL_SET_USED == "testing") {
	log.warn(`Using testing credentials and environment.`);
}

const { generateToken, doubleCsrfProtection } = doubleCsrf({
	getSecret: () => "Secret",
	cookieOptions: {
		secure: process.env.CREDENTIAL_SET_USED != "testing",
	},
	cookieName: cookieName,
	getTokenFromRequest: (request) => request.body["csrf-token"],
});

// configurations
app.use(express.static(__dirname + "/public"));
app.use(mongoSanitize());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", handlebars.engine);
app.use(urlParser);
app.use(cookieParser());
app.use(doubleCsrfProtection);
app.use((request, response, next) => {
	response.setHeader("x-csrf-token", generateToken(request, response));
	next();
});
// error handling
app.use(function (
	error: any,
	request: express.Request,
	response: express.Response,
	next: NextFunction
) {
	log.error(error);
	response.status(500).render("error");
});

// routes
require("fs")
	.readdirSync(require("path").join(__dirname, "./routes"))
	.forEach((file: string) => {
		app.use(require("./routes/" + file).router);
	});

// 404
app.get("*", async (request, response) => {
	response.status(404).render("404");
});

mongoose.connect(process.env.DATABASE_URI || "");
mongoose.connection.on("connected", async () => {
	log.info(`Connected to database! Database is now available.`);
});

app.listen(PORT, () => {
	log.info(`OrdinaryQuizGame listening at port ${PORT}`);
});
