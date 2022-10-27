function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2><br><center id='desc'>Note:If the score is 8 or more, then you are absolutely fine, if 4-8 then you are okay with little worries, if less than 4, then it means your mental health is not very good.</center>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Do you feel any kind of sadness these days or in past?", ["Not at all", "Sometimes","Not sure", "Yes"], "Not at all"),
    new Question("Do you like to go out and make friends?", ["No", "Yes", "Never tried", "No idea"], "Yes"),
    new Question("Are you undergoing any treatement or medication for mental issues?", ["Yes", "No","Dont want to answer", "I think I need"], "No"),
    new Question("Have you been feeling optimistic about the future?", ["Yes", "No", "Rarely", "I dont think about my future"], "Yes"),
    new Question("Do you have clear approach while making decisions?", ["Yes, always", "Not at all", "Sometimes", "I am always confused"], "Yes, always"),
    new Question("Do you get irritated or angered easily?", ["Not at all", "Sometimes","Not sure", "Yes"], "Not at all"),
    new Question("Do you like helping others?", ["Not at all", "Sometimes","Not sure", "Yes"], "Yes"),
    new Question("Do you have goals in life?", ["Yes, many", "Sometimes","Don't wanna tell", "No"], "Yes, many"),
    new Question("Do you get proper sleep and wake up fresh?", ["Yes, daily", "Sometimes","Rarely", "No"], "Yes, daily"),
    new Question("Are you happy and satisfied with whatever you have?", ["Not at all", "Sometimes","Not sure", "Yes, very happy"], "Yes, very happy")];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();