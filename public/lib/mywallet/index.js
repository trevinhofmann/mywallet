function handleIndexNewButtonClick(){
  popupPrompt('Would you like a quick tutorial of MyWallet?',
    [
      'Yes, please!',
      'No thanks!'
    ],
    [
      function(){
        alert('I should show you a tutorial now, but I am not ready for that yet. I will show you a demo wallet instead.');
        navigateTo('wallet-home');
        displayAccounts();
      },
      function(){
        navigateTo('wallet-home');
        displayAccounts();
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
        alert('I should show you the login grid now, but I am not ready for that yet. I will show you a demo wallet instead.');
        navigateTo('wallet-home');
        displayAccounts();
      },
      function(){
        alert('I should ask you for your mnemonic passphrase now, but I am not ready for that yet. I will show you a demo wallet instead.');
        navigateTo('wallet-home');
        displayAccounts();
      }
    ]
  );
}

$('#index-new-button').on('click', handleIndexNewButtonClick);
$('#index-login-button').on('click', handleIndexLoginButtonClick);