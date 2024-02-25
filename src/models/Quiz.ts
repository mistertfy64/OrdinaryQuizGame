import mongoose from "mongoose";

interface QuizInterface {
	questions: Array<object>;
}

interface QuizModel extends mongoose.Model<QuizInterface> {}

const QuizSchema = new mongoose.Schema<QuizInterface, QuizModel>({
	questions: Array,
});

const Quiz = mongoose.model<QuizInterface, QuizModel>(
	"Quiz",
	QuizSchema,
	"quizzes"
);

export default Quiz;