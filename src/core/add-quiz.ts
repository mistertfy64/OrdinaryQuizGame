import mongoose from "mongoose";
import Quiz from "../models/Quiz";
import { log } from "./log";

function addQuiz(body: { [key: string]: any }) {
	const quiz = new Quiz(body);
	try {
		quiz.save();
	} catch (error: any) {
		log.error(`Unable to save quiz: ${error}`);
		return null;
	}
	return quiz._id;
}

export { addQuiz };
