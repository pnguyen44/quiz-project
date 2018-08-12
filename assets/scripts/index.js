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
})
