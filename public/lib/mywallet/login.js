function handleLoginEnter(){
  alert('You clicked the enter button!');
}

function handleLoginNew(){
  alert('You clicked the new wallet button!');
}

function handleLoginGridClick(){
  var square = this;
  var normalColor = $(square).css('background-color');
  $(square).css('background-color', '#0000ff');
  setTimeout(function(){ 
    $(square).css('background-color', normalColor);
  }, 500);
}

$('#loginEnter').on('click', handleLoginEnter);
$('#loginNew').on('click', handleLoginNew);
$('.login-cell').on('click', handleLoginGridClick);

$('.login-cell').css({'height':$('.login-cell').width()+'px'});