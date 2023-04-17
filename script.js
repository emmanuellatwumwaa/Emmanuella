const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex, timeLeft, timerIntervalId;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.textContent = "Next";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  timeLeft = 50; // Set the total time for the quiz (in seconds)
  timerIntervalId = setInterval(updateTimer, 1000); // Update the timer every second
  setNextQuestion();
}


function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
  
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function endQuiz() {
    clearInterval(timerIntervalId);
    // Display the final score or any other end-of-quiz information
  }

  function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
      // If time is up, end the quiz
      clearInterval(timerIntervalId);
      endQuiz();
    } else {
      timerElement.innerText = `Time left: ${timeLeft}s`;
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  
  const questions = [
  {
    question: 'Who is the CEO of Tesla?',
    answers: [
      { text: 'Jeff Bezos', correct: false },
      { text: 'Elon Musk', correct: true },
      { text: 'Bill Gates', correct: false },
      { text: 'Mark Zuckerberg', correct: false }
    ]
  },
  {
    question: 'What is the national animal of Australia?',
    answers: [
      { text: 'Kangaroo', correct: true },
      { text: 'Koala', correct: false },
      { text: 'Wombat', correct: false },
      { text: 'Platypus', correct: false }
    ]
  },
  {
    question: 'What is the largest country by area?',
    answers: [
      { text: 'United States', correct: false },
      { text: 'Canada', correct: false },
      { text: 'Russia', correct: true },
      { text: 'China', correct: false }
    ]
  },
  {
    question: 'What is the tallest mammal?',
    answers: [
      { text: 'Giraffe', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Hippopotamus', correct: false },
      { text: 'Rhinoceros', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean in the world?',
    answers: [
      { text: 'Atlantic', correct: false },
      { text: 'Indian', correct: false },
      { text: 'Arctic', correct: false },
      { text: 'Pacific', correct: true }
    ]
  },
  {
    question: 'What is the capital city of Brazil?',
    answers: [
      { text: 'Sao Paulo', correct: false },
      { text: 'Brasilia', correct: true },
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Belo Horizonte', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for oxygen?',
    answers: [
      { text: 'O', correct: true },
      { text: 'H', correct: false },
      { text: 'N', correct: false },
      { text: 'C', correct: false }
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answers: [
      { text: 'Monaco', correct: false },
      { text: 'San Marino', correct: false },
      { text: 'Vatican City', correct: true },
      { text: 'Andorra', correct: false }
    ]
  },
  {
    question: 'What is the name of the highest mountain in Africa?',
    answers: [
      { text: 'Mount Everest', correct: false },
      { text: 'Kilimanjaro', correct: true },
      { text: 'Mount Fuji', correct: false },
      { text: 'Mount McKinley', correct: false }
    ]
  },
  {
    question: 'Who wrote the novel "Pride and Prejudice"?',
    answers: [
      { text: 'Jane Austen', correct: true },
      { text: 'Emily Bronte', correct: false },
      { text: 'Charlotte Bronte', correct: false },
      { text: 'George Eliot', correct: false }
    ]
  }
];
  