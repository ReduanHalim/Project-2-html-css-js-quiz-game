const questions = [
    {
        question: "What is the name of South Koreas largest company?",
        answers: [
            { text: "LG", correct: false },
            { text: "Hyundai", correct: false },
            { text: "Samsung", correct: true },
            { text: "Kia", correct: false },
        ]
    },
    {
        question: "Which animal can be seen on the Porsche logo?",
        answers: [
            { text: "Horse", correct: true },
            { text: "Sheep", correct: false },
            { text: "Ox", correct: false },
            { text: "Lion", correct: false },
        ]
    },
    {
        question: "What is the name of the World's largest ocean?",
        answers: [
            { text: "Atlantic ocean", correct: false },
            { text: "Indian ocean", correct: false },
            { text: "Pacific ocean", correct: true },
            { text: "Artic ocean", correct: false },
        ]
    },
    {
        question: "Which country consumes the most chocolate per capita?",
        answers: [
            { text: "Belgium", correct: false },
            { text: "France", correct: false },
            { text: "Italy", correct: false },
            { text: "Switzerland", correct: true },
        ]
    },
    {   question: "What is the most consumed manufactured drink in the world?",
        answers: [
            { text: "Soda", correct: false },
            { text: "Coffe", correct: false },
            { text: "Juice", correct: false },
            { text: "Tea", correct: true },
        ]
    },
    {
        question: "What's the fastest land animal?",
        answers: [
            { text: "Cheetah", correct: true },
            { text: "Gazelle", correct: false },
            { text: "Cougar", correct: false },
            { text: "Puma", correct: false },
        ]
    },
    {
        question: "What color is a ruby?",
        answers: [
            { text: "Green", correct: false },
            { text: "Blue", correct: false },
            { text: "Red", correct: true },
            { text: "Yellow", correct: false },
        ]
    },
    {
        question: "What's the smallest country in the world?",
        answers: [
            { text: "Luxembourg", correct: false },
            { text: "Vatican city", correct: true },
            { text: "Monaco", correct: false },
            { text: "Andorra", correct: false },
        ]
    },
    {
        question: "How many hearts does an octopus have?",
        answers: [
            { text: "5", correct: false },
            { text: "3", correct: true },
            { text: "1", correct: false },
            { text: "2", correct: false },
        ]
    },
    {
        question: "What is the nearest planet to the sun?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mercury", correct: true },
        ]
    }
    
];

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn");

let timeLeft = document.querySelector(".time-left");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
     
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();