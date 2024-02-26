function goToQuiz() {
	const quizID = document.getElementById("quiz-id").value;
	window.location.href = `/play/${quizID}`;
}
