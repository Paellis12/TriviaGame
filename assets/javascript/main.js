//Need to create object with questions, answers, and possible answers
//Then create start button to bring user to questions
//Then use if and else statements to conclude what will happen when an answer is picked
//Then create a game over message with correct and incorrect answers.

$(document).ready(function() {
    var game = {
        questions: [

           { 
                question: "In the first movie, how old was Bilbo turning at his big birthday party?",
                possibleAnswer: ["100", "99", "111", "21" ],
                id: "q1",
                answer: 2
            },
           
            {
                question: "How many members were in the fellowship in the beginning?",
                possibleAnswer: ["9", "100", "17", "3"],
                id: "q2",
                answer: 0

           },

           {
               question: "What color is the ONE ring?",
               possibleAnswer: ["silver", "tye-dye", "purple", "gold"],
               id: "q3",
               answer: 3
           },

           {
               question: "What was one of Gandalfs' alias'?",
               possibleAnswer: ["Stormcrow", "Gandalf the silver", "Graybeard", "Old man"],
               id : "q4",
               answer: 0
           },

           {
               question: "What can be boiled, mashed, and stuck in a stew?",
               possibleAnswer: ["potatoes", "taters", "POH-TAY-TOES", "carrots"],
               id: "q5",
               answer: 2
           },

           {
               question: "Where is Legolas from?",
               possibleAnswer: ["Land of Elves", "The Woodland Realm", "DC", "Mordor"],
               id: "q6",
               answer: 1
           }
        ]
    }
    //grab id from html and give start button functionality//
    $("#startGame").on("click", function(){
        $(this).hide();
        $(".wrapper").show();
    });
    //Will start the timer and inform the user how much time they have//
    var number = 60;
    
    //
    function decrement(){
        number--;
        $("#timeLeft").html("<h2>" + number + " seconds"+"</h2>");
        if (number === 0){
             stop();
             $(".message").html("Times Up!!!");
             checkAnswers();
        }
    }
    //sets the spacing of the time interval to = 1 second decrements//
    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    // The stop function that clears the interval counter
    function stop(){
        clearInterval(counter);
    }
    $("#timeLeft").on("click", run);
    run();

    function formTemplate(data) {
        
        var questionString = "<form id= 'q1'>"+ data.question +"<br>";
        var possibleAnswer = data.possibleAnswer;
         
            for (var i = 0; i < possibleAnswer.length; i++) {
                var possibleAnswer = possibleAnswer[i];
                console.log(possibleAnswer);
                questionString = questionString + "<input type= 'radio' name = '" +data.id+ "' value = "+ i +">"+ possibleAnswer;
                                                  
        
            }
            return questionString + "</form>";
    }
            window.formTemplate = formTemplate;

    function questionsFunc(){
        var questionHTML = '';
        for (var i = 0; i < game.questions.length; i++) {
                questionHTML = questionHTML + formTemplate(game.questions[i]);
            }
            $("#questions-container").append(questionHTML);
        
    }
    questionsFunc();

    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

    
    function resultsTemplate(question){
        var htmlBlock = "<div>"
        htmlBlock = htmlBlock + question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }
    

    function checkAnswers (){

            var correct = 0;
            var incorrect = 0;
            var unAnswered =0
        
            for (var i = 0; i<game.questions.length; i++) {
                if (isCorrect(game.questions[i])) {
                    correct++;
                } else {
        
                    if (checkAnswered(game.questions[i])) {
                        incorrect++;
                    } 
                    
                    else {
                        unAnswered++;
                    }
                }
        
            }
        
            $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }

        function checkAnswered(question){
            var anyAnswered = false;
            var answers = $('[name='+question.id+']');
    
            for (var i = 0; i < answers.length; i++) {
                if (answers[i].checked) {
                    anyAnswered = true;
                }
            }
            return anyAnswered;
        
        }

         $('.done-button').on('click', function() {
            checkAnswers();
            stop();
            $("#messageDiv").html("Game Over!");
            });
    

});