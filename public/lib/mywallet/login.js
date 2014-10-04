var bitcore = require('bitcore');

var currentlyTeaching = false;
var currentProgress = 0;
var totalProgress = 0;
var currentTeachingProgress = 0;
var loginSequence = [];

function handleLoginGridClick(){
  var square = $(this);
  if (currentlyTeaching){
    testLearningClick(square);
  }
}

function testLearningClick(square){
  flashSquare(square, 150, function(){
    if (parseInt(square.attr('id').substring(7)) == loginSequence[currentProgress]){
      currentProgress ++;
      if (currentProgress > totalProgress){
        if (currentProgress >= loginSequence.length){
          alert('You did it!');
          return;
        }
        totalProgress ++;
        currentProgress = 0;
        currentTeachingProgress = 0;
        currentlyTeaching = false;
        setTimeout(teachSequence, 1000);
      }
    }
    else{
      alert('You failed. Starting over.');
      currentlyTeaching = false;
      totalProgress = 0;
      currentProgress = 0;
      currentTeachingProgress = 0;
      teachSequence();
    }
  });
}

function flashSquare(square, duration, callback){
  var normalColor = getNormalColor(square);
  var selectedColor = getSelectedColor(square);
  $(square).css('background-color', selectedColor);
  setTimeout(function(){ 
    $(square).css('background-color', normalColor);
    callback();
  }, duration);
}

function getNormalColor(square){
  if (square.hasClass('color-0')){
    return '#ff8888';
  }
  if (square.hasClass('color-1')){
    return '#88ff88';
  }
  if (square.hasClass('color-2')){
    return '#8888ff';
  }
  if (square.hasClass('color-3')){
    return '#ffff88';
  }
  return '#000000';
}

function getSelectedColor(square){
  if (square.hasClass('color-0')){
    return '#dd0000';
  }
  if (square.hasClass('color-1')){
    return '#00dd00';
  }
  if (square.hasClass('color-2')){
    return '#0000dd';
  }
  if (square.hasClass('color-3')){
    return '#dddd00';
  }
  return '#000000';
}

function handleNewWalletClick(){
  var randomBuffer = bitcore.SecureRandom.getRandomBuffer(8);
  var randomHash = bitcore.util.sha256(randomBuffer);
  loginSequence = [];
  for (var i=0; i<= 9; i++){
    loginSequence[i] = Math.floor(randomHash[i]/4);
  }
  alert('Your login sequence has been generated! Please follow along to learn it.');
  console.log(loginSequence);
  currentlyTeaching = false;
  totalProgress = 0;
  currentProgress = 0;
  currentTeachingProgress = 0;
  teachSequence();
}

function teachSequence(){
  if (currentTeachingProgress > totalProgress){
    currentlyTeaching = true;
    return;
  }
  var square = $('#square-'+loginSequence[currentTeachingProgress]);
  flashSquare(square, 700, function(){
    setTimeout(function(){
      currentTeachingProgress ++;
      teachSequence();
    }, 300);
  });
}

$('.login-cell').on('click', handleLoginGridClick);

$('#new-wallet-button').on('click', handleNewWalletClick);

$('.login-cell').css({'height':$('.login-cell').width()+'px'});