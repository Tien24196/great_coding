var clickButtonEl = document.querySelector(".start-btn");
var startEl = document.querySelector(".start-quiz");
var quizSectionEl = document.querySelector(".quiz-section");
var timeLeftEl = document.querySelector(".timer");
var scoreListEl = document.querySelector(".score-list");
var questionEl = document.querySelector(".questions");
var optionEl = document.querySelector(".options");
var quizFooterEl = document.querySelector(".quiz-footer");



var timeLeft = 5;
function countDown() {
    
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftEl.textContent = "Time: " + timeLeft;

        } else {
            quizSectionEl.style.display = "none";
            scoreListEl.style.display = "block";
            clearInterval(timeInterval);
            timeLeftEl.textContent = "Time: " + 0;
        }
    },1000);
};


clickButtonEl.addEventListener("click", function() {

    startEl.style.display = "none";
    quizSectionEl.style.display = "block";
    timeLeftEl.textContent = "Time: " + timeLeft;
    countDown();
    setNextQuestion();

});



function setNextQuestion() {
   showQuestion();

};


function showQuestion() {
    questionEl.textContent = questions[0].question;
    questions[0].answers.forEach(answer => {
        var answerDiv = document.createElement("div");
        answerDiv.textContent = answer.text;
        answerDiv.classList.add("options");
        if (answer.correct) {
            answerDiv.dataset.correct = answer.correct;
        };

        answerDiv.addEventListener("click", selectAnswer);
        quizSectionEl.appendChild(answerDiv);


    });
};


function selectAnswer(e) {
    var selectedAnswer = e.target;
    var correct = selectedAnswer.dataset.correct;
    if (correct) {
        quizFooterEl.textContent = "correct"
    } else {
        quizFooterEl.textContent = "wrong"
    }

};


// optionEl.removeEventListener("click",)



var questions = [
    {
        question: "Who are you",
        answers: [
            {text: "Mina", correct: true },
            {text: "Daniel", correct: false },
            {text: "Tien", correct: false },
            {text: "John", correct: false },
            
        ]
    },
    {
        question: "how old are you",
        answers: [
            {text: "20", correct: false },
            {text: "35", correct: false },
            {text: "7", correct: true },
            {text: "19", correct: false },
            
        ]
    },
    {
        question: "you from",
        answers: [
            {text: "vietnam", correct: false },
            {text: "korea", correct: true },
            {text: "japan", correct: false },
            {text: "UK", correct: false },
            
        ]
    },
    {
        question: "where you live",
        answers: [
            {text: "high point", correct: false },
            {text: "greensboro", correct: false },
            {text: "ashville", correct: false },
            {text: "DC", correct: true },
            
        ]
    },
    {
        question: "live with",
        answers: [
            {text: "mom", correct: false },
            {text: "dad", correct: false },
            {text: "sis", correct: true },
            {text: "bro", correct: false },
            
        ]
    }
];






