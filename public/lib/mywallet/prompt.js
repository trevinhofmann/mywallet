function popupPrompt(prompt, choices, callbacks){
  $('#prompt-title').text(prompt);
  $('#prompt-options').empty();
  for (var choice in choices){
    $('#prompt-options').append(function(){
      var callback = callbacks[choice];
      return $('<br><button type="button" class="btn btn-primary btn-lg btn-block">'+choices[choice]+'</button>').click(function(){
        closePrompt();
        callback();
      });
    });
  }
  openPrompt();
}

function popupTextPrompt(prompt, callback){
  $('#prompt-title').text(prompt);
  $('#prompt-options').empty();
  $('#prompt-options').append('<input type="text" id="popupInput">');
  $('#prompt-options').append(function(){
    return $('<br><button type="button" class="btn btn-primary btn-lg btn-block">Submit</button>').click(function(){
      var value = $('#popupInput').val();
      closePrompt();
      callback(value);
    });
  });
  openPrompt();
}

function openPrompt(){
  $('#prompt').show();
}

function closePrompt(){
  $('#prompt').hide();
}

$('#prompt').hide();