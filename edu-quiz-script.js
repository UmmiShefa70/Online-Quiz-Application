// edu-quiz-script.js

const quizData = [
  {
    question: "What is the main focus of Edunet Foundation?",
    options: [
      "Real estate development",
      "E-commerce platforms",
      "Technology education and skill development",
      "Food and beverage services"
    ],
    answer: "Technology education and skill development"
  },
  {
    question: "Which group supports Edunet Foundation in their upskilling programs?",
    options: [
      "Facebook",
      "Amazon",
      "IBM SkillsBuild",
      "Google Cloud"
    ],
    answer: "IBM SkillsBuild"
  },
  {
    question: "Edunet Foundation primarily works with which group of learners?",
    options: [
      "Retired professionals",
      "University and school students",
      "Only working professionals",
      "Fashion designers"
    ],
    answer: "University and school students"
  },
  {
    question: "Which of the following is a key program run by Edunet Foundation?",
    options: [
      "SkillsBuild Program",
      "Green Earth Project",
      "Digital Mall Initiative",
      "Code for Fashion"
    ],
    answer: "SkillsBuild Program"
  },
  {
    question: "Edunet Foundation is recognized as a ________.",
    options: [
      "Private enterprise",
      "Government department",
      "Section 8 not-for-profit organization",
      "Co-operative bank"
    ],
    answer: "Section 8 not-for-profit organization"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timePerQuestion = 30;
let timeLeft = timePerQuestion;

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextBtn = document.getElementById("next-btn");
const timerText = document.getElementById("time");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score");
const totalText = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  resetState();
  timeLeft = timePerQuestion;
  timerText.textContent = timeLeft;
  startTimer();

  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  currentQuestion.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectAnswer(li, currentQuestion.answer);
    optionsList.appendChild(li);
  });
}

function resetState() {
  clearInterval(timer);
  nextBtn.disabled = true;
  optionsList.innerHTML = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showCorrectAnswer();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function selectAnswer(selectedLi, correctAnswer) {
  clearInterval(timer);

  const options = optionsList.querySelectorAll("li");
  options.forEach(option => {
    option.style.pointerEvents = "none"; // disable all options
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
  });

  if (selectedLi.textContent === correctAnswer) {
    score++;
    selectedLi.classList.add("correct");
  } else {
    selectedLi.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function showCorrectAnswer() {
  const options = optionsList.querySelectorAll("li");
  const correctAnswer = quizData[currentQuestionIndex].answer;
  options.forEach(option => {
    option.style.pointerEvents = "none";
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.remove("visible");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.add("visible");
  scoreText.textContent = score;
  totalText.textContent = quizData.length;
}

// Start quiz initially
loadQuestion();