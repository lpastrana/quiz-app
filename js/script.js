var questions = [{
    question: "What is the name of our team?",
    choices: ["Defenders", "Inhumans", "Costume Gang", "Squadron Supreme"],
    correctAnswer: 1
}, {
    question: "Who am I?",
    choices: ["Nova", "Trident", "Sub Mariner", "Imperious"],
    correctAnswer: 2
}, {
    question: "Who am I?",
    choices: ["Silver Surfer", "Mysterio", "Namor", "Ice Man"],
    correctAnswer: 0
}, {
    question: "Who am I?",
    choices: ["Sersi", "Ms. Marvel", "Enchantress", "Songbird"],
    correctAnswer: 2
}, {
    question: "Who am I?",
    choices: ["Guardian", "Atlas", "Mohawk", "Gladiator"],
    correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {
            // The value of the radio button that gets checked is assigned to the var 'selection'
            selection = $("input[type='radio']:checked").val();

            console.log(selection); // Just wanted to log the value for examination of the code

            if (selection == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (selection == questions[currentQuestion].correctAnswer) {
                    // Compares if the checkbox selected is equal to the correct one
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

       if(currentQuestion == 0){
        $("#img0").show();
        $("#img1").hide();
        $("#img2").hide();
        $("#img3").hide();
        $("#img4").hide();
    } else if(currentQuestion == 1){
        $("#img0").hide();
        $("#img1").show();
        $("#img2").hide();
        $("#img3").hide();
        $("#img4").hide();
    } else if(currentQuestion == 2){
        $("#img0").hide();
        $("#img2").show();
        $("#img1").hide();
        $("#img3").hide();
        $("#img4").hide();
    } else if(currentQuestion == 3){
        $("#img0").hide();
        $("#img3").show();
        $("#img1").hide();
        $("#img2").hide();
        $("#img4").hide();
    } else if(currentQuestion == 4){
        $("#img0").hide();
        $("#img4").show();
        $("#img1").hide();
        $("#img2").hide();
        $("#img3").hide();
    }

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
