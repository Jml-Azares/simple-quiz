const questions = [
    {
      question: "Who is the author of the famous novel 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "F. Scott Fitzgerald", "J.D. Salinger", "Ernest Hemingway"],
      answer: 0
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mercury", "Venus", "Jupiter", "Saturn"],
      answer: 2
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "South Korea", "Japan", "Thailand"],
      answer: 2
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      answer: 2
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Hg", "Au", "Cu"],
      answer: 2
    },
    {
      question: "Which country is famous for the Taj Mahal?",
      options: ["India", "Egypt", "Turkey", "Italy"],
      answer: 0
    },
    {
      question: "What is the capital city of France?",
      options: ["Rome", "Berlin", "Paris", "Madrid"],
      answer: 2
    },
    {
      question: "Who is the Greek god of the sea?",
      options: ["Zeus", "Poseidon", "Apollo", "Hermes"],
      answer: 1
    },
    {
      question: "In which year did World War II end?",
      options: ["1939", "1941", "1943", "1945"],
      answer: 3
    },
    {
      question: "What is the national animal of Canada?",
      options: ["Beaver", "Moose", "Polar bear", "Bald eagle"],
      answer: 0
    },
    {
      question: "Who wrote the play Romeo and Juliet?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      answer: 0
    },
    {
      question: "What is the highest mountain in the world?",
      options: ["Mount Everest", "K2", "Mount Kilimanjaro", "Mount Fuji"],
      answer: 0
    },
    {
      question: "Which continent is known as the 'Dark Continent'?",
      options: ["Asia", "Africa", "Europe", "Australia"],
      answer: 1
    },
    {
      question: "What is the chemical symbol for iron?",
      options: ["Fe", "Ir", "In", "Sn"],
      answer: 0
    },
    {
      question: "Who was the first person to step foot on the moon?",
      options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John F. Kennedy"],
      answer: 0
    },
    {
      question: "What is the capital city of Brazil?",
      options: ["Brasília", "Rio de Janeiro", "São Paulo", "Buenos Aires"],
      answer: 0
    },
    {
      question: "Who is the creator of the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
      answer: 1
    },
    {
      question: "In which city is the famous Colosseum located?",
      options: ["Athens", "Rome", "Paris", "London"],
      answer: 1
    },
    {
      question: "What is the largest ocean in the world?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: 3
    },
    {
      question: "Who is the current Prime Minister of the United Kingdom?",
      options: ["Theresa May", "David Cameron", "Boris Johnson", "Tony Blair"],
      answer: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const nextButton = document.getElementById("next-button");
  const startButton = document.getElementById("start-button");
  
  function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
  }
  
  function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
  
    optionsContainer.innerHTML = "";
  
    for (let i = 0; i < question.options.length; i++) {
      const option = document.createElement("div");
      option.className = "form-check";
      const input = document.createElement("input");
      input.type = "radio";
      input.className = "form-check-input";
      input.name = "answer";
      input.value = i;
      input.addEventListener("click", enableNextButton);
      const label = document.createElement("label");
      label.textContent = question.options[i];
      label.className = "form-check-label";
      option.appendChild(input);
      option.appendChild(label);
      optionsContainer.appendChild(option);
    }
  
    nextButton.textContent = "Next";
    nextButton.disabled = true;
    nextButton.style.display = "block";
    if (currentQuestion === questions.length - 1) {
      nextButton.textContent = "Submit";
    }
  }
  
  function enableNextButton() {
    nextButton.disabled = false;
  }
  
  function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
      return; // No answer selected, do not proceed
    }
  
    const selectedOptionIndex = parseInt(selectedOption.value);
    const question = questions[currentQuestion];
    if (selectedOptionIndex === question.answer) {
      score++;
      showAnswerFeedback(true);
    } else {
      showAnswerFeedback(false, question.options[question.answer]);
    }
  
    if (currentQuestion === questions.length - 1) {
      showResult();
    } else {
      currentQuestion++;
      showQuestion();
    }
  }
  
  function showAnswerFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById("feedback");
    if (isCorrect) {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Wrong! The correct answer is: ${correctAnswer}`;
      feedback.style.color = "red";
    }
  }
  
  function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
  
    const percentage = (score / questions.length) * 100;
    let message = "";
  
    if (percentage >= 80) {
      message = "Congratulations! You did an excellent job.";
    } else if (percentage >= 60) {
      message = "Well done! You have a good score.";
    } else if (percentage >= 40) {
      message = "Not bad! You can try again to improve your score.";
    } else {
      message = "Don't worry! You can always try again.";
    }
  
    resultElement.textContent = message;
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
  }