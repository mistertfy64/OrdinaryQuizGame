const questionBox = document.getElementById("question-box--question-1");
let numberOfQuestions = 1;

document.getElementById("add-new-question").onclick = function () {
	numberOfQuestions++;
	const newQuestionBox = questionBox.cloneNode(true);
	newQuestionBox.id = `question-box--question-${numberOfQuestions}`;
	document.getElementById("questions").appendChild(newQuestionBox);
};
