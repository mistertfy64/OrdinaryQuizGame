import mongoose from "mongoose";

interface QuizInterface {
	questions: Array<object>;
	name: string;
	creationDateAndTime: Date;
	results: Array<object>;
	contactInformation: string;
}

interface QuizModel extends mongoose.Model<QuizInterface> {}

const QuizSchema = new mongoose.Schema<QuizInterface, QuizModel>({
	questions: Array,
	name: String,
	contactInformation: String,
	creationDateAndTime: Date,
	results: Array,
});

const Quiz = mongoose.model<QuizInterface, QuizModel>(
	"Quiz",
	QuizSchema,
	"quizzes"
);

export default Quiz;
