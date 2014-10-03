function handleLoginEnter(){
  alert('You clicked the enter button!');
}

function handleLoginNew(){
  alert('You clicked the new wallet button!');
}

function handleLoginGridClick(){
  var square = $(this);
  flashSquare(square);
}

function flashSquare(square){
  var normalColor = getNormalColor(square);
  var selectedColor = getSelectedColor(square);
  $(square).css('background-color', selectedColor);
  setTimeout(function(){ 
    $(square).css('background-color', normalColor);
  }, 200);
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

$('#loginEnter').on('click', handleLoginEnter);
$('#loginNew').on('click', handleLoginNew);
$('.login-cell').on('click', handleLoginGridClick);

$('.login-cell').css({'height':$('.login-cell').width()+'px'});