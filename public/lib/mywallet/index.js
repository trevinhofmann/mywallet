function handleIndexNewButtonClick(){
  popupPrompt('Would you like a quick tutorial of MyWallet?',
    [
      'Yes, please!',
      'No thanks!'
    ],
    [
      function(){
        alert('I should show you a tutorial now.');
      },
      function(){
        navigateTo('wallet-home');
      }
    ]
  );
}

function handleIndexLoginButtonClick(){
  alert('I should ask how you want to log in now.');
}

$('#index-new-button').on('click', handleIndexNewButtonClick);
$('#index-login-button').on('click', handleIndexLoginButtonClick);