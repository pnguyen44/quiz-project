$(() => {
  // let videoLenght = 0;
  let chosen = ''
  let score = 0;
  let questionNumber = 1;
  let vid ='';
  let currentTime = '';
  let id = ''
  // let video = ''
  let quest = ''
  let questions = {
	"video1": {
		"url": "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
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
   // let json = question
   // let questionsObj = JSON.parse(questions);
   // console.log('objlll', questionsObj)
// }
  // let questions = [
  //   {
  //     'question': 'What is Apple\'s most lucrative product of 2015?',
  //     'options': ['iphone', 'BApple Watch', 'Ipad'],
  //     'answer': 'iphone',
  //     'times': [0,2]
  //   },
  //   {
  //     'question': 'Who invented the tablet?',
  //     'options': ['Microsoft', 'Google', 'Apple'],
  //     'answer': 'Google',
  //     'times': [2.1,4]
  //   },
  //   {
  //     'question': 'In 1999 who created the first mp3 phone?',
  //     'options': ['Toshiba', 'Samsung', 'Sony'],
  //     'answer': 'Sony',
  //     'times': [4.1,7]
  //   }
  // ]
getVideo()
  function getVideo() {
    // console.log('url', questions.video1.url)
    $('#video1').attr('src', questions.video1.url)
  }

  $("video").on('playing', function () {
    id = $(this).attr('id')
    vid = document.getElementById(id);
    currentTime  = vid.currentTime
    // console.log('vid is', currentTime)
    // video = questions[id]
    // let vid = document.getElementById(id);
    // console.log('vido playing', $(this))
    // console.log('vido playing', id)
    $(this).on("timeupdate", pauseForQuestion);
  });

  function  pauseForQuestion(){
    // console.log('id test', questions[id].questions[questionNumber -1].times[1])
    if(this.currentTime >= questions[id].questions[questionNumber -1].times[1]){
        this.pause();
        displayQuestion();
        // remove the event listener after you paused the playback
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
    console.log('qeust', quest)
    if(questionNumber < questions[id].questions.length + 1) {
      console.log('got hre', questionNumber)

      chosen = ''
      $('input[name="choice"]').prop('checked', false);
      // quest = questions[id].questions[questionNumber -1]
      // console.log('qeust', question)
      for(let i = 0; i < 3; i++) {
        let elm = '#option' + (i +1)
        $(elm).html(quest.options[i])
        console.log('text', quest.options[i])
      }
      $('.modal-title').html(quest.question)
        $('#question').modal({backdrop: 'static', keyboard: false})
        $('.message').html('')
        // $('.btn-submit').prop("disabled", false);
        $('#question').modal('show')
    }
  }

  $('.btn-replay').on('click', function () {
    $('#question').modal('hide')
    vid.currentTime = quest.times[0]
    vid.play()
    // console.log('replay clicked')
  })

  $('.btn-give-answer').on('click', function () {
    $('.message').html("The correct answer is " + quest.answer)
    // $('#question').modal('hide')
    if (questionNumber < questions[id].questions.length) {
      $('.btn-continue').show()
    } else {
      $('.btn-results').show()
    }
    $('.btn-wrong').hide()
    questionNumber += 1

    // console.log('replay clicked')
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
    console.log('restart')
  })

  $("#quizForm").submit(function(e){
    e.preventDefault();
  });

$('#quizForm input').on('click', function() {
  chosen = $(this).next().html()
 // console.log('chosen', chosen);
});

$('#question').on('submit', function() {
  // chosen = $(this).val()
  $('.message').html('')
 // console.log('chosen sub', chosen);
 if (chosen !== '') {
     $('.close').hide()
   if (chosen === quest.answer) {
     // console.log('correct')
     // $('#question').modal('hide')
     $('.message').html('Good Jobs!')
     // $('.btn-submit').prop("disabled", true);
     questionNumber +=1
     score +=1
     console.log('quest numb', questionNumber)
     console.log('score is ', score)
     $('.btn-submit').hide()
     if (questionNumber < questions[id].questions.length + 1) {
       $('.btn-continue').show()
     }

       if (questionNumber === questions[id].questions.length + 1) {
         // $('#question').modal('hide')
         $('.btn-results').show()
         // displayResults()
        // console.log('You scored ' + score/questions.length * 100 + '%')
       }

     } else {
       $('.message').html('Incorrect!')
        // $('<button type="button" class="btn btn-primary btn-sx btn-replay">Replay Video</button>').appendTo('.message');
        $('.btn-wrong').show()
        $('.btn-submit').hide()
      // $('.btn-submit').prop("disabled", true);
     }
  }
  });

  function displayResults() {
    // $('<p> You scored ' + Math.round(score/questions.length * 100) + '%' + '</p>').appendTo('.results-modal-body');
    $('.results-title').html('You scored ' + Math.round(score/questions.length * 100) + '%')
    $('#resultsModal').modal('show')
  }

})
