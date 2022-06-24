var clickButton = document.querySelector(".start-btn");
var start = document.querySelector(".start-quiz");
var quizSection = document.querySelector(".quiz-section");


clickButton.addEventListener("click", function() {

    start.style.display = "none";
    quizSection.style.display = "block";

});