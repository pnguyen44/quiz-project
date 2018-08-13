$(() => {
  let chosen = ''
  let score = 0;
  let questionNumber = 1;
  let vid ='';
  let currentTime = '';
  let id = ''
  let quiz = ''
  let questions = ''
  const config = {
	"video1": {
		"url": "https://www.apple.com/105/media/us/mac/family/2018/46c4b917_abfd_45a3_9b51_4e3054191797/films/bruce/mac-bruce-tpl-cc-us-2018_1280x720h.mp4",
		"questions": [{
				"question": "What medical condition does this man have?",
				"options": ['legally blind', 'heart disease', 'lung cancer'],
				"answer": 'legally blind',
				"times": [0, 18]
			},
			{
				"question": "What does this man use a Macbook for?",
				"options": ['drawing', 'games', 'photography'],
				"answer": "photography",
				"times": [18.1, 37]
			},
			{
				"question": "What apple product helped him improve his eye sight?",
				"options": ['MacbookPro', 'iPhone', 'Macbook'],
				"answer": "Macbook",
				"times": [37.1, 60]
			}
		]},
  }

  function getVideo() {
  $('#video1').attr('src', config.video1.url)
  }

  getVideo()

  $("video").on('playing', function () {
    id = $(this).attr('id')
    vid = document.getElementById(id);
    currentTime  = vid.currentTime
    questions = config[id].questions
    $(this).on("timeupdate", pauseForQuestion);
  });

  function  pauseForQuestion(){
    quiz = questions[questionNumber -1]
    if(this.currentTime >=quiz.times[1]){
        this.pause();
        displayQuestion();
        this.removeEventListener("timeupdate",pauseForQuestion);
    }
  };

  function displayQuestion () {
    $('.close').show()
    $('.btn-results').hide()
    $('.btn-continue').hide()
    $('.btn-wrong').hide()
    $('.btn-submit').show()
    if(questionNumber < questions.length + 1) {
      chosen = ''
      $('input[name="choice"]').prop('checked', false);
      for(let i = 0; i < 3; i++) {
        let elm = '#option' + (i +1)
        $(elm).html(quiz.options[i])
      }
      $('.modal-title').html(quiz.question)
        $('#question').modal({backdrop: 'static', keyboard: false})
        $('.message').html('')
        $('#question').modal('show')
    }
  }

  $('.btn-replay').on('click', function () {
    $('#question').modal('hide')
    vid.currentTime = quiz.times[0]
    vid.play()
  })

  $('.btn-give-answer').on('click', function () {
    $('.message').html("The correct answer is " + quiz.answer)
    if (questionNumber < questions.length) {
      $('.btn-continue').show()
    } else {
      $('.btn-results').show()
    }
    $('.btn-wrong').hide()
    questionNumber += 1
  })

  $('.btn-continue').on('click', function() {
    vid.play()
    $('#question').modal('hide')
  })

  $('.btn-results').on('click', function() {
    $('#question').modal('hide')
    displayResults()
  })

  $('.btn-retake').on('click', function() {
    chosen = ''
    score = 0;
    questionNumber = 1;
    vid.currentTime = 0
    vid.play()
    $('#resultsModal').modal('hide')
  })

  $("#quizForm").submit(function(e){
    e.preventDefault();
  });

$('#quizForm input').on('click', function() {
  chosen = $(this).next().html()
});

$('#question').on('submit', function() {
  $('.message').html('')
 if (chosen !== '') {
     $('.close').hide()
   if (chosen === quiz.answer) {
     $('.message').html('Good Job!')
     questionNumber +=1
     score +=1
     $('.btn-submit').hide()
     if (questionNumber < questions.length + 1) {
       $('.btn-continue').show()
     }

       if (questionNumber === questions.length + 1) {
         $('.btn-results').show()
       }

     } else {
       $('.message').html('Incorrect')
        $('.btn-wrong').show()
        $('.btn-submit').hide()
     }
   }
  });

  function displayResults() {
    $('.results-title').html('You scored ' + Math.round(score/questions.length * 100) + '%')
    $('#resultsModal').modal('show')
  }

})
