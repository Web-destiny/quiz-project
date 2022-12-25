const DATA = [
    {
        question: 'Вопрос 1.?',
        answers: [
            {
                id: '1',
                value: 'Ответ 1.',
                correct: true
            },
            {
                id: '2',
                value: 'Ответ 2.',
                correct: true
            },
            {
                id: '3',
                value: 'Ответ 3.',
                correct: true
            }
        ],
    },
    {
        question: 'Вопрос 2',
        answers: [
            {
                id: '4',
                value: 'Ответ 1.',
                correct: false
            },
            {
                id: '5',
                value: 'Ответ 2.',
                correct: false
            },
            {
                id: '6',
                value: 'Ответ 3.',
                correct: true
            },
        ],
    },
    {
        question: 'Вопрос 3?',
        answers: [
            {
                id: '7',
                value: 'Ответ 1.',
                correct: false
            },
            {
                id: '8',
                value: 'Ответ 2.',
                correct: true
            },
            {
                id: '9',
                value: 'Ответ 3.!!',
                correct: false
            },
        ],
    },
];

let localResults = {};

const quiz = document.querySelector('#quiz')
const questions = document.querySelector('#questions')
const indicator = document.querySelector('#indicator')
const results = document.querySelector('#results')
const btnNext = document.querySelector('#btn-next')
const btnRestart = document.querySelector('#btn-restart')

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index

    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
          <li>
              <label>
                  <input type="radio" class="answer-input" name="${index}" value="${answer.id}">
                    ${answer.value}
                  </label>
           </li>
        `)
        .join('');
    questions.innerHTML = `
    <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">${DATA[index].question}</div>
            <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = ''

    const getClassName = (answer, questionIndex) => {
        let className = ''

        if (!answer.correct && answer.id === localResults[questionIndex]) {
            className = 'answer--invalid'
        } else if (answer.correct) {
            className = 'answer--valid'
        }

        return className
    }

    const getAnswers = (questionIndex) =>
        DATA[questionIndex].answers
        .map((answer) => `<li class="${getClassName(answer, questionIndex)}">${answer.value}</li>`)
        .join('')

    DATA.forEach((question, index) => {
        content += `
        <div class="quiz-results-item">
            <div class="quiz-results-item__question">${question.question}</div>
            <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
        </div>
        `
    })

    results.innerHTML = content
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`
};

quiz.addEventListener('change', (event) => {
    // логика ответа
    if(event.target.classList.contains('answer-input')){
        localResults[event.target.name] = event.target.value
        btnNext.disabled = false
    }
})

quiz.addEventListener('click', (event) => {
    // вперед или сначала
    if(event.target.classList.contains('btn-next')){
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1

        if(DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden')
            indicator.classList.add('indicator--hidden')
            results.classList.add('results--visible')
            btnNext.classList.add('btn-next--hidden')
            btnRestart.classList.add('btn-restart--visible')
            renderResults()
        }else{
            renderQuestions(nextQuestionIndex)
        }

        btnNext.disabled = true
    }
    if(event.target.classList.contains('btn-restart')){
        localResults = {}
        results.innerHTML = ''

        questions.classList.remove('questions--hidden')
        indicator.classList.remove('indicator--hidden')
        results.classList.remove('results--visible')
        btnNext.classList.remove('btn-next--hidden')
        btnRestart.classList.remove('btn-restart--visible')

        renderQuestions(0)
    }
})

renderQuestions(0)
