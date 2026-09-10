// ==========================================
// EXPLORE INSTRUMENT FAMILIES FILTER
// ==========================================

// Get all filter buttons
const filterButtons = document.querySelectorAll(".tab-btn");

// Get all instrument cards
const instrumentCards = document.querySelectorAll(".instrument-card");

// Add click events to every filter button
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Get selected category from the button
        const selectedCategory =
            button.getAttribute("data-category");

        // ==========================================
        // UPDATE ACTIVE BUTTON
        // ==========================================

        filterButtons.forEach((tab) => {
            tab.classList.remove("active");
        });

        button.classList.add("active");

        // ==========================================
        // FILTER INSTRUMENT CARDS
        // ==========================================

        instrumentCards.forEach((card) => {

            // Get the category of this card
            const cardCategory =
                card.getAttribute("data-category");

            // Show all cards if "all" is selected
            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "";

                // Remove hidden class if it exists
                card.classList.remove("hidden");

            } else {

                // Hide cards that don't match
                card.style.display = "none";

                card.classList.add("hidden");

            }

        });

    });

});


// ==========================================
// MUSICVERSE - QUIZ SYSTEM
// ==========================================

// Quiz question database

const quizQuestions = [

    {
        question: "Which instrument belongs to the string family?",
        answers: ["Trumpet", "Guitar", "Flute", "Drums"],
        correct: 1
    },

    {
        question: "Which instrument is usually played using a keyboard?",
        answers: ["Violin", "Piano", "Saxophone", "Trumpet"],
        correct: 1
    },

    {
        question: "Which instrument belongs to the brass family?",
        answers: ["Flute", "Trumpet", "Guitar", "Drums"],
        correct: 1
    },

    {
        question: "Which instrument creates sound using vibrating strings?",
        answers: ["Guitar", "Flute", "Trumpet", "Drums"],
        correct: 0
    },

    {
        question: "What creates the sound of a drum?",
        answers: ["Vibrating strings", "Moving air", "Striking a surface", "Electronic signals"],
        correct: 2
    },

    {
        question: "Which instrument uses a reed to create sound?",
        answers: ["Piano", "Saxophone", "Violin", "Drums"],
        correct: 1
    },

    {
        question: "Which instrument belongs to the keyboard family?",
        answers: ["Piano", "Trumpet", "Flute", "Violin"],
        correct: 0
    },

    {
        question: "Which instrument is commonly used in orchestras?",
        answers: ["Violin", "DJ Controller", "Synthesizer", "Electronic Drum Pad"],
        correct: 0
    },

    {
        question: "Which instrument produces sound when air moves through it?",
        answers: ["Flute", "Guitar", "Drums", "Piano"],
        correct: 0
    },

    {
        question: "Which family does the trumpet belong to?",
        answers: ["String", "Woodwind", "Brass", "Keyboard"],
        correct: 2
    },

    {
        question: "Which instrument is played with a bow?",
        answers: ["Violin", "Trumpet", "Drums", "Piano"],
        correct: 0
    },

    {
        question: "What family does the saxophone belong to?",
        answers: ["Brass", "String", "Woodwind", "Percussion"],
        correct: 2
    },

    {
        question: "Which instrument has strings struck by hammers?",
        answers: ["Flute", "Piano", "Trumpet", "Drums"],
        correct: 1
    },

    {
        question: "Which instrument is mainly used to create rhythm?",
        answers: ["Drums", "Violin", "Flute", "Trumpet"],
        correct: 0
    },

    {
        question: "Which instrument belongs to the electronic category?",
        answers: ["Synthesizer", "Violin", "Flute", "Trumpet"],
        correct: 0
    },

    {
        question: "What is used to play a traditional trumpet?",
        answers: ["A bow", "Lips and breath", "A keyboard", "Drumsticks only"],
        correct: 1
    },

    {
        question: "Which instrument is known for its six common strings?",
        answers: ["Guitar", "Flute", "Trumpet", "Drums"],
        correct: 0
    },

    {
        question: "Which instrument is a percussion instrument?",
        answers: ["Drums", "Violin", "Saxophone", "Trumpet"],
        correct: 0
    },

    {
        question: "What does a synthesizer use to create sound?",
        answers: ["Electronic signals", "Only wooden strings", "Only air", "Only a bow"],
        correct: 0
    },

    {
        question: "Which instrument is popular in jazz music?",
        answers: ["Saxophone", "Bagpipes only", "Triangle only", "None of these"],
        correct: 0
    },

    {
        question: "Which instrument is from the string family and is often used in classical music?",
        answers: ["Violin", "Trumpet", "Drums", "Flute"],
        correct: 0
    },

    {
        question: "Which instrument requires controlled airflow?",
        answers: ["Flute", "Guitar", "Piano", "Drums"],
        correct: 0
    },

    {
        question: "Which instrument category includes drums?",
        answers: ["Percussion", "String", "Brass", "Electronic"],
        correct: 0
    },

    {
        question: "Which instrument can produce many different electronic sounds?",
        answers: ["Synthesizer", "Violin", "Flute", "Trumpet"],
        correct: 0
    },

    {
        question: "Which instrument family uses vibrating air?",
        answers: ["Woodwind", "String", "Keyboard", "Percussion"],
        correct: 0
    },

    {
        question: "Which instrument family uses lip vibration?",
        answers: ["Brass", "String", "Keyboard", "Percussion"],
        correct: 0
    },

    {
        question: "Which instrument is played by plucking strings?",
        answers: ["Guitar", "Flute", "Trumpet", "Drums"],
        correct: 0
    },

    {
        question: "Which instrument can be played using drumsticks?",
        answers: ["Drums", "Violin", "Flute", "Trumpet"],
        correct: 0
    },

    {
        question: "Which family includes instruments that are often struck?",
        answers: ["Percussion", "String", "Brass", "Woodwind"],
        correct: 0
    },

    {
        question: "Which instrument is commonly associated with classical orchestras?",
        answers: ["Violin", "Synthesizer", "DJ Controller", "Electronic Pad"],
        correct: 0
    }

];

// ==========================================
// QUIZ ELEMENTS
// ==========================================

const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");
const scoreElement = document.getElementById("score");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const quizResult = document.getElementById("quizResult");
const nextQuestionButton = document.getElementById("nextQuestion");

// ==========================================
// QUIZ SETTINGS
// ==========================================

// Number of questions shown in one quiz
const questionsPerQuiz = 10;

// ==========================================
// QUIZ VARIABLES
// ==========================================

let currentQuestion = 0;
let score = 0;
let answered = false;
let activeQuestions = [];

// ==========================================
// SHUFFLE QUESTIONS
// ==========================================

function shuffleArray(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temporaryValue = shuffled[i];

        shuffled[i] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;

    }

    return shuffled;

}

// ==========================================
// START QUIZ
// ==========================================

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    scoreElement.textContent = score;

    // Shuffle all questions
    activeQuestions = shuffleArray(quizQuestions).slice(0, questionsPerQuiz);

    // Update total questions
    totalQuestions.textContent = activeQuestions.length;

    // Reset button
    nextQuestionButton.textContent = "Next Question →";
    nextQuestionButton.onclick = null;

    // Load first question
    loadQuestion();

}

// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    const current = activeQuestions[currentQuestion];

    questionNumber.textContent = currentQuestion + 1;
    questionText.textContent = current.question;

    answerButtons.innerHTML = "";
    quizResult.textContent = "";

    nextQuestionButton.style.display = "none";

    answered = false;

    // Create answer buttons
    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("quiz-answer");
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerButtons.appendChild(button);

    });

}

// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const current = activeQuestions[currentQuestion];
    const correctAnswer = current.correct;

    const buttons = document.querySelectorAll(".quiz-answer");

    buttons.forEach((button, index) => {

        button.disabled = true;

        // Highlight correct answer
        if (index === correctAnswer) {
            button.classList.add("correct-answer");
        }

        // Highlight wrong answer
        if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add("wrong-answer");
        }

    });

    // Check answer
    if (selectedAnswer === correctAnswer) {

        score++;
        scoreElement.textContent = score;

        quizResult.textContent = "🎉 Correct! Great job!";

    } else {

        quizResult.textContent =
            "❌ Not quite! The correct answer is " +
            current.answers[correctAnswer] +
            ".";

    }

    // Show next button
    nextQuestionButton.style.display = "inline-block";

}

// ==========================================
// NEXT QUESTION
// ==========================================

nextQuestionButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < activeQuestions.length) {
        loadQuestion();
    } else {
        showQuizResults();
    }

});

// ==========================================
// FINAL QUIZ RESULTS
// ==========================================

function showQuizResults() {

    questionText.textContent = "🎉 Quiz Complete!";

    answerButtons.innerHTML = "";

    const percentage = Math.round((score / activeQuestions.length) * 100);

    let message = "";

    if (percentage === 100) {
        message = "🏆 Perfect score! You are a MusicVerse master!";
    } else if (percentage >= 80) {
        message = "🌟 Excellent work! You know your instruments very well!";
    } else if (percentage >= 60) {
        message = "🎵 Great job! Keep exploring the world of music!";
    } else if (percentage >= 40) {
        message = "🎶 Nice effort! Practice and try again!";
    } else {
        message = "🎸 Keep learning! Every musician starts somewhere!";
    }

    quizResult.innerHTML =
        "<strong>Your Score: " +
        score +
        " / " +
        activeQuestions.length +
        "</strong><br><br>" +
        percentage +
        "%<br><br>" +
        message;

    nextQuestionButton.textContent = "🔄 Play Again";
    nextQuestionButton.style.display = "inline-block";

    // Restart quiz
    nextQuestionButton.onclick = () => {
        startQuiz();
    };

}

// ==========================================
// START QUIZ
// ==========================================

startQuiz();


// ==========================================
// MUSICVERSE FUN FACTS
// ==========================================

const funFacts = [

    "🎸 The guitar commonly has six strings, but guitars can have seven, eight, or more strings.",
    "🎹 A standard modern piano usually has 88 keys.",
    "🥁 Drums are among the oldest known musical instruments.",
    "🎻 The violin is one of the highest-pitched instruments in the standard string family.",
    "🎺 Trumpets have been used in different forms for thousands of years.",
    "🎷 The saxophone belongs to the woodwind family even though it is commonly made of brass.",
    "🪈 Flutes are among the oldest types of musical instruments.",
    "🎛️ A synthesizer can create and modify many different sounds electronically.",
    "🌍 Every culture around the world has developed its own musical traditions and instruments.",
    "🎶 Music can be created using vibrating strings, moving air, striking surfaces, or electronic signals.",
    "🎹 The piano is both a string instrument and a keyboard instrument in terms of how its sound is produced and played.",
    "🎸 Guitar strings can be made from materials such as nylon or metal.",
    "🥁 A drum produces sound when its surface vibrates after being struck.",
    "🎻 A violin bow usually uses tightly stretched hair to create sound from the strings.",
    "🎺 Brass instruments create sound when players buzz their lips into a mouthpiece.",
    "🎷 The saxophone uses a single reed to help produce its sound.",
    "🪈 Different flute designs have existed in many cultures throughout history.",
    "🎹 Piano sound is created when small hammers strike strings inside the instrument.",
    "🎛️ Synthesizers became especially important in many styles of modern electronic music.",
    "🌍 Traditional instruments often reflect the history and culture of the places where they developed.",
    "🎶 Rhythm is an important part of music across almost every musical culture.",
    "🥁 Percussion instruments can be struck, shaken, scraped, or played in other ways.",
    "🎸 String instruments can create different pitches by changing the vibrating length of their strings.",
    "🎻 Violins are important instruments in orchestras, chamber music, and many folk traditions.",
    "🎺 Trumpets are commonly used in orchestras, jazz bands, and marching bands.",
    "🎷 Saxophones are especially well known for their role in jazz music.",
    "🎹 Pianos can play both melodies and multiple notes at the same time.",
    "🎛️ Electronic instruments can imitate traditional sounds or create completely new ones.",
    "🌎 Music is often used for celebrations, storytelling, ceremonies, and entertainment.",
    "🎵 Learning an instrument can help develop listening and coordination skills.",
    "🎸 A musician can change a guitar's sound using different playing techniques.",
    "🥁 A drum set usually contains several different drums and cymbals.",
    "🎹 The piano keyboard is arranged in repeating patterns of white and black keys.",
    "🎻 The smallest member of the common violin family is the violin itself.",
    "🎺 Brass instruments use tubes of different lengths to produce different pitches.",
    "🪈 Woodwind instruments create sound through moving air and, in some instruments, reeds.",
    "🎷 The saxophone was invented in the 19th century.",
    "🎛️ Synthesizers can change characteristics such as pitch and tone.",
    "🎶 A melody is a sequence of musical notes that forms a recognizable tune.",
    "🥁 Tempo describes how fast or slow music is played.",
    "🎵 Rhythm describes patterns of sound and silence in music.",
    "🎼 Musical notation is a system used to write down music.",
    "🎹 A pianist can use pedals to change how the piano sounds.",
    "🎸 Guitar players can play chords, melodies, and rhythms.",
    "🎻 Violin players can produce different sounds by changing bow pressure and position.",
    "🎺 Trumpet players use valves to help change notes.",
    "🎷 Different saxophones are made in different sizes and pitch ranges.",
    "🪈 Flute players control pitch using finger positions and airflow.",
    "🥁 Drummers often use both hands and feet when playing a drum set.",
    "🎛️ Electronic music often uses synthesizers, samplers, and digital instruments.",
    "🌍 Exploring instruments from different countries is a great way to learn about world cultures.",
    "🎶 Practice is usually more effective when done regularly rather than all at once."

];

// ==========================================
// FUN FACT ELEMENTS
// ==========================================

const funFactElement = document.getElementById("funFact");
const factButton = document.getElementById("factButton");

// ==========================================
// LAST FACT TRACKER
// ==========================================

let lastFactIndex = -1;

// ==========================================
// GET RANDOM FACT
// ==========================================

function getRandomFact() {

    let randomIndex;

    // Prevent immediate repetition
    do {
        randomIndex = Math.floor(Math.random() * funFacts.length);
    } while (randomIndex === lastFactIndex && funFacts.length > 1);

    lastFactIndex = randomIndex;

    return funFacts[randomIndex];

}

// ==========================================
// SHOW FUN FACT
// ==========================================

function showFunFact() {

    const newFact = getRandomFact();

    funFactElement.textContent = newFact;

    // Small animation
    funFactElement.style.opacity = "0";

    setTimeout(() => {
        funFactElement.style.opacity = "1";
    }, 100);

}

// ==========================================
// FUN FACT BUTTON
// ==========================================

factButton.addEventListener("click", showFunFact);
