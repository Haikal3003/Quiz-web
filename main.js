const startPage = document.querySelector('.start-page');
const startButton = document.querySelector('.start-btn');
const rulePage = document.querySelector('.rule-section');
const exitButton = document.querySelector('.exit-btn');
const continueButton = document.querySelector('.continue-btn');
const userPage = document.querySelector('.user-page');
const start_quiz_button = document.querySelector('.start-quiz-btn');
const questionPage = document.querySelector('.question-page');
const option_list = document.querySelector('.option-list');
const userInput = document.querySelector('.user-input');
const time_counter = document.querySelector('.counter');
const resultPage = document.querySelector('.result-page');

startButton.addEventListener('click', () => {
  startPage.classList.add('start-show');
  rulePage.classList.add('rule-show');
});

exitButton.addEventListener('click', () => {
  rulePage.classList.remove('rule-show');
  startPage.classList.remove('start-show');
});

continueButton.addEventListener('click', () => {
  rulePage.classList.remove('rule-show');
  userPage.classList.add('user-show');
});

start_quiz_button.addEventListener('click', () => {
  const alert = document.querySelector('.alert');
  const userValue = userInput.value;

  if (userInput.value == '') {
    const alertText = '<p>Harap Masukan Username !!!</p>';
    alert.innerHTML = alertText;
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
    alert.style.display = 'block';
  } else {
    setTimeout(() => {
      questionPage.classList.add('question-show');
      userPage.classList.remove('user-show');
    }, 1200);
  }

  questionQuiz(0);
  users(userValue);
  startTimer(20);
});

let quest_count = 0;
// let quest_numb = 1;
let correct_score = 0;
let incorrect_score = 0;
let quest_timer = 20;
let counter;

const quitButton = document.querySelector('.quit-btn');

// quit button
quitButton.addEventListener('click', () => {
  window.location.reload();
});

// next button
const nextButton = document.querySelector('.next-btn');

nextButton.addEventListener('click', () => {
  const userValue = userInput.value;
  if (quest_count < questions.length - 1) {
    quest_count++;
    questionQuiz(quest_count);
    users(userValue);
    clearInterval(counter);
    startTimer(quest_timer);

    nextButton.classList.remove('show-btn');
  } else {
    clearInterval(counter);
    showResult();
  }
});

function questionQuiz(index) {
  const soal = document.querySelector('.soal');

  const soalText = '<h2>' + questions[index].question + '</h2>';
  const questOption =
    "<div class='option'>" +
    questions[index].option[0] +
    '</div>' +
    "<div class='option'>" +
    questions[index].option[1] +
    '</div>' +
    "<div class='option'>" +
    questions[index].option[2] +
    '</div>' +
    "<div class='option'>" +
    questions[index].option[3] +
    '</div>';

  soal.innerHTML = soalText;
  option_list.innerHTML = questOption;

  const option = option_list.querySelectorAll('.option');

  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', (e) => {
      const target = e.target;
      selectOption(target);
      clearInterval(counter);
    });
  }
}

function showResult() {
  clearInterval(counter);
  questionPage.classList.remove('question-show');
  resultPage.classList.add('result-show');

  const result_heading = document.querySelector('.result-heading');
  const correct_number = document.querySelector('.correct-number');
  const incorrect_number = document.querySelector('.incorrect-number');

  const total = document.querySelector('.total');

  result_heading.innerText = `Selamat ${userInput.value} kamu sudah menyelesaikan quiz ini.`;

  correct_number.innerText = correct_score;
  incorrect_number.innerText = incorrect_score;
  total.innerText = questions.length;
}

let tickIconTag = '<div class="icon check"><i class="bx bx-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="bx bx-x"></i></div>';

function selectOption(answer) {
  const answerText = answer.textContent;
  const correctAnswer = questions[quest_count].answer;
  const allOption = option_list.children.length;

  if (answerText == correctAnswer) {
    correct_score += 1;
    answer.classList.add('correct');
    answer.insertAdjacentHTML('beforeend', tickIconTag);

    console.log('kamu menjawab jawaban benar : ' + correct_score);
  } else {
    incorrect_score += 1;
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', crossIconTag);

    console.log('kamu menjawab jawaban yang salah :' + incorrect_score);
  }

  for (let i = 0; i < allOption.length; i++) {
    if (allOption.children[i].textContent == correctAnswer) {
      allOption.children[i].setAttribute('class', 'option correct');
      allOption.children[i].insertAdjacentHTML('beforeend', tickIconTag);
    } else {
      allOption.children[i].setAttribute('class', 'option incorrect');
      allOption.children[i].insertAdjacentHTML('beforeend', crossIconTag);
    }
  }

  const option = option_list.querySelectorAll('.option');

  option.forEach((list) => {
    if (answerText == correctAnswer || answerText !== correctAnswer) {
      list.classList.add('disable');
    }
  });

  nextButton.classList.add('show-btn');
}

function users(input) {
  const username = document.querySelector('.username');
  username.innerHTML = `<h3>${input}</h3>`;
}

function startTimer(time) {
  counter = setInterval(counterTime, 1000);

  function counterTime() {
    time_counter.innerText = time;
    time--;
    if (time < 9) {
      let addZero = time_counter.innerText;
      time_counter.textContent = '0' + addZero;
      time_counter.classList.add('timer-red');
    }

    if (time < 0) {
      clearInterval(counter);
      const timeText = document.querySelector('.time-text');
      timeText.innerText = 'Time off';

      const option = option_list.querySelectorAll('.option');

      option.forEach((list) => {
        list.classList.add('disable');
      });

      time_counter.classList.remove('timer-red');

      nextButton.classList.add('show-btn');
    }
  }
}
