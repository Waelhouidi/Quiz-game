//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const startButtonn = document.getElementById("start-buttonn");
const chapterDiv = document.querySelector(".display-chapter-option");

startButton.addEventListener("click", () => {
  chapterDiv.style.display = "block";
});
// Quiz arrays for each chapter
const quizArrayChapter1 = [
    {
      id: "0",
      question: "Chapter 1: Which is the most widely spoken language in the world?",
      options: ["Spanish", "Mandarin", "English", "German"],
      correct: "Mandarin",
    },
    {
      id: "1",
      question: "Chapter 1: Which is the most widely spoken language in the world?",
      options: ["Spanish", "Mandarin", "English", "German"],
      correct: "Mandarin",
    },
    {
      id: "2",
      question: "Chapter 1: Which is the most widely spoken language in the world?",
      options: ["Spanish", "Mandarin", "English", "German"],
      correct: "Mandarin",
    },
    {
      id: "3",
      question: "Chapter 1: Which is the most widely spoken language in the world?",
      options: ["Spanish", "Mandarin", "English", "German"],
      correct: "Mandarin",
    },
    // Add more questions for Chapter 1...
  ];
  
  const quizArrayChapter2 = [
    {
      id: "0",
      question: "Chapter 2: What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: "Paris",
    },
    // Add more questions for Chapter 2...
  ];
  
  const quizArrayChapter3 = [
    {
      id: "0",
      question: "Chapter 3: What is the largest planet in the solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Mars"],
      correct: "Jupiter",
    },
    // Add more questions for Chapter 3...
  ];
  
  // Add more chapters as needed...
  
  // References
  let quizArray; // This will hold the active chapter's quiz questions
  
  // Add event listeners to chapter buttons
  document.getElementById("chapter1").addEventListener("click", () => {
    quizArray = quizArrayChapter1; // Set quizArray to Chapter 1 questions
    startQuiz(); // Start the quiz
  });
  
  document.getElementById("chapter2").addEventListener("click", () => {
    quizArray = quizArrayChapter2; // Set quizArray to Chapter 2 questions
    startQuiz(); // Start the quiz
  });
  
  document.getElementById("chapter3").addEventListener("click", () => {
    quizArray = quizArrayChapter3; // Set quizArray to Chapter 3 questions
    startQuiz(); // Start the quiz
  });
  
  // Add more event listeners for additional chapters...
  
  // Function to start the quiz
  function startQuiz() {
    startScreen.classList.add("hide"); // Hide the start screen
    displayContainer.classList.remove("hide"); // Show the quiz container
    initial(); // Initialize the quiz
  }
  
  // Rest of your existing JavaScript logic remains unchanged
  // (Restart Quiz, Next Button, Timer, Quiz Creation, Checker Function, Initial Setup, etc.)

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};