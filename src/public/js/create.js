const questionBox = document.getElementById("question-box--question-1");
let numberOfQuestions = 1;

document.getElementById("add-new-question-button").onclick = function () {
	// limit number of questions to 100
	if (numberOfQuestions >= 100) {
		return;
	}

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
		const result = { questions: [] };
		for (let q = 1; q <= numberOfQuestions; q++) {
			const questionElement = document.getElementById(
				`question-box--question-${q}`
			);
			const questionInformation = {};
			// the question
			questionInformation.question = questionElement.querySelector(
				"input[name='question']"
			).value;
			// the correct answer
			questionInformation.correctAnswer = questionElement.querySelector(
				`input[name='correct-answer--q${q}']:checked`
			).value;
			// the answers
			questionInformation.answers = [];
			const questionAnswerInformation =
				questionElement.querySelector(".answer-box");
			for (let a = 1; a <= 4; a++) {
				const element = questionAnswerInformation.querySelector(
					`input[name='answer${a}']`
				);
				questionInformation.answers.push(element.value);
			}
			result.questions.push(questionInformation);
		}
		return result;
	}

	try {
		const body = createBody();
		const response = await fetch("/publish", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	} catch (error) {}
};
