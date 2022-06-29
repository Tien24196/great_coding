var clickButtonEl = document.querySelector(".start-btn");
var startEl = document.querySelector(".start-quiz");
var quizSectionEl = document.querySelector(".quiz-section");
var timeLeftEl = document.querySelector(".timer");
var scoreListEl = document.querySelector(".score-list");
var questionEl = document.querySelector(".questions");
var optionEl = document.querySelector(".options");
var quizFooterEl = document.querySelector(".quiz-footer");
var answerSectionEl = document.querySelector(".answers");
var postQuizEl = document.querySelector(".post-quiz");
var showScoreEl = document.querySelector(".show-score");
var postFooterEl = document.querySelector(".post-footer");
var submitBtnEl = document.querySelector(".submit-btn");
var scoreListEl = document.querySelector (".score-list");
var initialInputEl = document.querySelector (".input");
var scoreInitEl = document.querySelector (".list-of-score");
var goBackEl = document.querySelector(".go-back-btn");
var clearStorageEl = document.querySelector(".clear-btn");
var viewScoresEl = document.querySelector(".view-score-btn")


// Question array.
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "alerts", correct: true },
            {text: "booleans", correct: false },
            {text: "strings", correct: false },
            {text: "numbers", correct: false },
            
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ______.",
        answers: [
            {text: "quotes", correct: false },
            {text: "curly brackets", correct: false },
            {text: "parenthesis", correct: true },
            {text: "square brackets", correct: false },
            
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        answers: [
            {text: "numbers and strings", correct: false },
            {text: "other arrays", correct: false },
            {text: "booleans", correct: false },
            {text: "all of the above", correct: true },
            
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            {text: "commas", correct: false },
            {text: "curly brackets", correct: false },
            {text: "parenthesis", correct: false },
            {text: "quotes", correct: true },
            
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {text: "console.log", correct: true },
            {text: "JavaScript", correct: false },
            {text: "terminal/bash", correct: false },
            {text: "for loops", correct: false },
            
        ]
    }
];


// Variables for the timer and score.
var currentQuestion = 0;
var timeLeft = 90;
var scoresEl = [];


// Timer function.
function countDown() {

            timeLeft--;
            timeLeftEl.textContent = "Time: " + timeLeft;
            if (timeLeft === 0) {
                postQuiz()
            };
                
};

// Event when start quiz buttun is clicked.
clickButtonEl.addEventListener("click", function() {
    viewScoresEl.style.display = "none";
    startEl.style.display = "none";
    quizSectionEl.style.display = "block";
    timeLeftEl.textContent = "Time: " + timeLeft;
    timeInterval = setInterval(countDown,1000);
    showQuestion();
});


// Create div for each question and anwser.
function showQuestion() {
    questionEl.textContent = questions[currentQuestion].question;
    questions[currentQuestion].answers.forEach(answer => {
        var answerDiv = document.createElement("div");
        answerDiv.textContent = answer.text;
        answerDiv.classList.add("options");
        if (answer.correct) {
            answerDiv.dataset.correct = answer.correct;
        };

        answerDiv.addEventListener("click", selectAnswer);
        answerSectionEl.appendChild(answerDiv);


    });
};

// Envents when each answer is chosen.
function selectAnswer(e) {
  

    var selectedAnswer = e.target;
    var correct = selectedAnswer.dataset.correct;

    while (answerSectionEl.firstChild) {
        answerSectionEl.removeChild(answerSectionEl.firstChild);
    };

    if (correct) {
        quizFooterEl.textContent = "Correct!";
        postFooterEl.textContent = "Correct!";
    } else {
        timeLeft = timeLeft - 10;
        timeLeft = Math.max(timeLeft,0);
        quizFooterEl.textContent = "Wrong!";
        postFooterEl.textContent = "Wrong!";
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
       
    } else {
        postQuiz();

    }

    
    if (timeLeft === 0 ) {
        postQuiz();
        
}
};


// Post-quiz is generated when last question is answered.
function postQuiz () {

    quizSectionEl.style.display = "none";
    postQuizEl.style.display = "block";
    clearInterval(timeInterval);
    timeLeftEl.textContent = "Time: " + timeLeft;
    showScoreEl.textContent = "Your final score is " + timeLeft;

    submitBtnEl.addEventListener("click", showScoreList);
    
};


//Function to show scores and inital of players.
function showScoreList(event) {

    event.preventDefault();
  

    if (!initialInputEl.value) {
        alert("Please enter your initial before submitting!");
        return false;
    } else {
    
    postQuizEl.style.display = "none";
    scoreListEl.style.display = "block";

    var initial = initialInputEl.value.toUpperCase();
   
    scoresEl.push({initials: initial, scores: timeLeft});
    scoresEl = scoresEl.sort((a, b) => {
        if (a.scores < b.scores) {
          return 1;
        } else {
          return -1;
        }
    
      });
    
    scoreInitEl.innerHTML="";
      for (let i = 0; i < scoresEl.length; i++) {
          let li = document.createElement("li");
          li.textContent = `${scoresEl[i].initials}: ${scoresEl[i].scores}`;
          scoreInitEl.append(li);
      }
         console.log(scoresEl)
    
      storeScores();
      displayScores();
  }};


// Store score array to local storage.
  function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoresEl));
  };

  

// Event when go-back button is clicked.
goBackEl.addEventListener("click", function () {
    viewScoresEl.style.display = "block";
    scoreListEl.style.display = "none";
    startEl.style.display = "flex";
    timeLeft = 90;
    timeLeftEl.textContent = "Time: " + timeLeft;
    currentQuestion = 0;
    quizFooterEl.textContent="";

});


// Event when clear-storage button is clicked.
clearStorageEl.addEventListener("click", function() {
    localStorage.clear();
    scoreInitEl.innerHTML="";
    scoresEl = [];
});



// Generate score windown when view-score button is clicked.
viewScoresEl.addEventListener("click", function() {
    displayScores();
    scoreInitEl.innerHTML="";

    for (let i = 0; i < scoresEl.length; i++) {
          let li = document.createElement("li");
          li.textContent = `${scoresEl[i].initials}: ${scoresEl[i].scores}`;
          scoreInitEl.append(li);
      };

    if (!scoresEl[0]) {
        alert("No scores to show");
    } else {
        startEl.style.display = "none";
        scoreListEl.style.display = "block";
       
    }
});

// Retrieve score from local storage.
function displayScores() {

    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    

    
    if (storedScoreList !== null) {
        scoresEl = storedScoreList;
    }
 };












    

    









