$(() => {
  let chosen = ''
  let score = 0;
  let questionNumber = 1;
  let vid ='';
  let currentTime = '';
  let id = ''
  let quest = ''
  let questions = {
	"video1": {
		"url": "https://www.apple.com/105/media/us/mac/family/2018/46c4b917_abfd_45a3_9b51_4e3054191797/films/bruce/mac-bruce-tpl-cc-us-2018_1280x720h.mp4",
		"questions": [{
				"question": "What is Apple most lucrative product of 201?",
				"options": ['iphone', 'BApple Watch', 'Ipad'],
				"answer": "iphone",
				"times": [0, 2]
			},
			{
				"question": "Who invented the tablet?",
				"options": ['Microsoft', 'Google', 'Apple'],
				"answer": "Google",
				"times": [2.1, 4]
			},
			{
				"question": "In 1999 who created the first mp3 phone?",
				"options": ['Toshiba', 'Samsung', 'Sony'],
				"answer": "Sony",
				"times": [4.1, 7]
			}
		]
	},
}
getVideo()
  function getVideo() {
    $('#video1').attr('src', questions.video1.url)
  }

  $("video").on('playing', function () {
    id = $(this).attr('id')
    vid = document.getElementById(id);
    currentTime  = vid.currentTime
    $(this).on("timeupdate", pauseForQuestion);
  });

  function  pauseForQuestion(){
    if(this.currentTime >= questions[id].questions[questionNumber -1].times[1]){
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
    quest = questions[id].questions[questionNumber -1]
    if(questionNumber < questions[id].questions.length + 1) {

      chosen = ''
      $('input[name="choice"]').prop('checked', false);
      for(let i = 0; i < 3; i++) {
        let elm = '#option' + (i +1)
        $(elm).html(quest.options[i])
      }
      $('.modal-title').html(quest.question)
        $('#question').modal({backdrop: 'static', keyboard: false})
        $('.message').html('')
        $('#question').modal('show')
    }
  }

  $('.btn-replay').on('click', function () {
    $('#question').modal('hide')
    vid.currentTime = quest.times[0]
    vid.play()
  })

  $('.btn-give-answer').on('click', function () {
    $('.message').html("The correct answer is " + quest.answer)
    if (questionNumber < questions[id].questions.length) {
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
   if (chosen === quest.answer) {
     console.log('correct got here')
     $('.message').html('Good Jobs!')
     questionNumber +=1
     score +=1
     console.log('quest numb', questionNumber)
     console.log('score is ', score)
     $('.btn-submit').hide()
     if (questionNumber < questions[id].questions.length + 1) {
       $('.btn-continue').show()
     }

       if (questionNumber === questions[id].questions.length + 1) {
         $('.btn-results').show()
       }

     } else {
       $('.message').html('Incorrect!')
        $('.btn-wrong').show()
        $('.btn-submit').hide()
     }
   }
  });

  function displayResults() {
    $('.results-title').html('You scored ' + Math.round(score/questions[id].questions.length * 100) + '%')
    $('#resultsModal').modal('show')
  }

})
