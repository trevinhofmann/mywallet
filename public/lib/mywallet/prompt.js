function popupPrompt(prompt, choices, callbacks){
  $('#prompt-title').text(prompt);
  $('#prompt-options').empty();
  for (var choice in choices){
    $('#prompt-options').append(function(){
      var callback = callbacks[choice];
      return $('<br><button type="button" class="btn btn-primary btn-lg btn-block">'+choices[choice]+'</button>').click(function(){
        callback();
        closePrompt();
      });
    });
  }
  $('#prompt').show();
}

function closePrompt(){
  $('#prompt').hide();
}

$('#prompt').hide();