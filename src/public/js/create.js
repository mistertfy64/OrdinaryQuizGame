const questionBox = document.getElementById("question-box--question-1");
let numberOfQuestions = 1;

document.getElementById("add-new-question-button").onclick = function () {
	function createCorrectAnswerBox(number) {
		return `Correct answer: <input type="radio" name="correct-answer--q${number}" value="answer1"> Answer 1&nbsp;
    <input type="radio" name="correct-answer--q${number}" value="answer2"> Answer 2&nbsp;
    <input type="radio" name="correct-answer--q${number}" value="answer3"> Answer 3&nbsp;
    <input type="radio" name="correct-answer--q${number}" value="answer4"> Answer 4`;
	}

	numberOfQuestions++;
	const newQuestionBox = questionBox.cloneNode(true);
	const newQuestionCorrectAnswerBox = newQuestionBox.querySelector(
		".correct-answer-box"
	);
	newQuestionCorrectAnswerBox.innerHTML =
		createCorrectAnswerBox(numberOfQuestions);
	newQuestionBox.id = `question-box--question-${numberOfQuestions}`;
	document.getElementById("questions").appendChild(newQuestionBox);
};

document.getElementById("publish-button").onclick = async function () {
	function createBody() {
		const result = [];
		for (let i = 1; i <= numberOfQuestions; i++) {
			const questionElement = document.getElementById(
				`question-box--question-${numberOfQuestions}`
			);
			console.log(questionElement);
			const questionInformation = {};
			questionInformation.question = questionElement;
		}
	}

	try {
		const response = await fetch("/publish", {
			method: "post",
			body: createBody(),
		});
	} catch (error) {}
};
