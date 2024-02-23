import express, { Request, Response } from "express";
import { create } from "express-handlebars";
import { log } from "./core/log";

// constants
const PORT = 10003;
const app = express();
const hbs = create({});

// configurations
app.use(express.static(__dirname + "/public"));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", hbs.engine);

// routes
require("fs")
	.readdirSync(require("path").join(__dirname, "./routes"))
	.forEach((file: string) => {
		app.use(require("./routes/" + file).router);
	});

app.listen(PORT, () => {
	log.info(`OrdinaryQuizGame listening at port ${PORT}`);
});
