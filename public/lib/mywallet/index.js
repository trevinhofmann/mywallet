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
  popupPrompt('How would you like to login?',
    [
      'Grid Sequence',
      'Mnemonic Passphrase'
    ],
    [
      function(){
        navigateTo('login-grid');
      },
      function(){
        alert('I should ask you for your mnemonic passphrase now.');
      }
    ]
  );
}

$('#index-new-button').on('click', handleIndexNewButtonClick);
$('#index-login-button').on('click', handleIndexLoginButtonClick);