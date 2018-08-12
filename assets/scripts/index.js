$(() => {
  // let videoLenght = 0;
  let chosen = ''
  let score = 0;
  let questionNumber = 1;
  let vid = document.getElementById("video");
  let currentTime = vid.currentTime
  let questions = [
    {
      'question': 'What is Apple\'s most lucrative product of 2015?',
      'options': ['iphone', 'BApple Watch', 'Ipad'],
      'answer': 'iphone',
      'times': [0,2]
    },
    {
      'question': 'Who invented the tablet?',
      'options': ['Microsoft', 'Google', 'Apple'],
      'answer': 'Google',
      'times': [2.1,4]
    },
    {
      'question': 'In 1999 who created the first mp3 phone?',
      'options': ['Toshiba', 'Samsung', 'Sony'],
      'answer': 'Sony',
      'times': [4.1,7]
    }
  ]


  $("video").on('playing', function () {
    video.addEventListener("timeupdate", pauseForQuestion);
  });

  function  pauseForQuestion(){
    if(this.currentTime >= questions[questionNumber -1].times[1]) {
        this.pause();
        displayQuestion();
        // remove the event listener after you paused the playback
        this.removeEventListener("timeupdate",pauseForQuestion);
    }
  };

  function displayQuestion () {
    // console.log('currentTime', vid.currentTime)
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
        $(elm).html(questions[questionNumber - 1].options[i])
        // console.log(elm)
      }
      $('.modal-title').html(questions[questionNumber -1].question)
        $('#question').modal({backdrop: 'static', keyboard: false})
        $('.message').html('')
        // $('.btn-submit').prop("disabled", false);
        $('#question').modal('show')
    }
  }

  $('.btn-replay').on('click', function () {
    $('#question').modal('hide')
    vid.currentTime = questions[questionNumber -1].times[0]
    vid.play()
    // console.log('replay clicked')
  })

  $('.btn-give-answer').on('click', function () {
    $('.message').html("The correct answer is " + questions[questionNumber - 1].answer)
    // $('#question').modal('hide')
    if (questionNumber < questions.length) {
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
   if (chosen === questions[questionNumber - 1].answer) {
     // console.log('correct')
     // $('#question').modal('hide')
     $('.message').html('Good Jobs!')
     // $('.btn-submit').prop("disabled", true);
     questionNumber +=1
     score +=1
     console.log('quest numb', questionNumber)
     console.log('score is ', score)
     $('.btn-submit').hide()
     if (questionNumber < questions.length + 1) {
       $('.btn-continue').show()
     }

       if (questionNumber ===questions.length + 1) {
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

})
