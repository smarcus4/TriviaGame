var triviaQuestions = [{
	question: "What is the name of our Galaxy?",
	answerList: ["The Ort Cloud", "The Milky Way", "Andromeda Galaxy", "Whirpool Galaxy"],
	answer: 1
},{
	question: "What is the brightest Star in our Sky?",
	answerList: ["Sirius", "Vega", "Aldeberan", "Deneb"],
	answer: 0
},{
	question: "How many planets are in our Solar System?",
	answerList: ["Eight", "Nine", "Ten", "Seven"],
	answer: 0
},{
	question: "What Layer of the Sun do we see(if we could stare at it)?",
	answerList: ["Chromophere", "Diosphere", "Photosphere", "Outersphere"],
	answer: 2
},{
	question: "Between What Two Planets does the Asteroid Belt Lay within?",
	answerList: ["Mercury & Venus", "Uranus & Neptune", "Venus & Earth", "Earth & Mars"],
	answer: 3
},{
	question: "What is the length of our Galaxy (In light years)?",
	answerList: ["100,000", "70,000", "120,000", "150,000"],
	answer: 0
},{
	question: "What wavelength of light do humans see in?",
	answerList: ["Ultraviolet", "Visible", "Infared", "Gamma"],
	answer: 1
},{
	question: "What is the name of our North Star?",
	answerList: ["Alnitak", "Fohlmahaut", "Polaris", "Cyrus"],
	answer: 2
},{
	question: "How old is our Universe (In years)?",
	answerList: ["16 billion", "14 billion", "20 billion", "8 billion"],
	answer: 1
},{
	question: "How close is the nearest Galaxy (In light years)?",
	answerList: ["6.1 million", "10.6 million", "2.3 million", "1 million"],
	answer: 2
},{
	question: "What type of Galaxy is the Milky Way?",
	answerList: ["Chromo", "Spiral", "Elliptical", "Satellite"],
	answer: 1
},{
	question: "What phase is the moon during a Solar Eclipse?",
	answerList: ["1st Quarter", "3rd Quarter", "Full Moon", "New Moon"],
	answer: 3
},{
	question: "What causes the seasons on Earth?",
	answerList: ["The Orbit", "The Axis", "The size of the Sun", "We are just unique"],
	answer: 1
},{
	question: "What is the name of the nearest star?",
	answerList: ["Virgo", "Alnilam", "Alpha Centauri", "Antares"],
	answer: 2
},{
	question: "How far away is our Sun (in millions of miles)?",
	answerList: ["93", "1000", "68", "20"],
	answer: 0
}];
var search = ['astronomy+milkyway', 'astronomy+stars', 'solar+system', 'the+sun', 'solar+planets', 'galaxies+astronomy', 'visible+light+spectrum', 'north+star', 'the+universe', 'spiral+galaxy', 'solar+eclipse', 'stars+space', 'solar+system+size'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api
	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=astronomy+" + search[currentQuestion] + "&limit=1&rating=g&api_key=dc6zaTOxFJmzC"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
