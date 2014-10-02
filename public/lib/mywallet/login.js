function handleLoginEnter(){
  alert('You clicked the enter button!');
}

function handleLoginNew(){
  alert('You clicked the new wallet button!');
}

$('#loginEnter').on('click', handleLoginEnter);
$('#loginNew').on('click', handleLoginNew);