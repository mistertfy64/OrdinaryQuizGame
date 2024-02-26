import express, { Request, Response } from "express";
import { create } from "express-handlebars";
import { log } from "./core/log";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
require("dotenv").config();

// constants
const PORT = 10003;
const app = express();
const handlebars = create({});

// configurations
app.use(express.static(__dirname + "/public"));
app.use(mongoSanitize());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", handlebars.engine);

// routes
require("fs")
	.readdirSync(require("path").join(__dirname, "./routes"))
	.forEach((file: string) => {
		app.use(require("./routes/" + file).router);
	});

mongoose.connect(process.env.DATABASE_URI || "");
mongoose.connection.on("connected", async () => {
	log.info(`Connected to database! Database is now available.`);
});

if (process.env.CREDENTIAL_SET_USED == "testing") {
	log.warn(`Using testing credentials.`);
}

app.listen(PORT, () => {
	log.info(`OrdinaryQuizGame listening at port ${PORT}`);
});
