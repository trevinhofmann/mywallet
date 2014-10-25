function handleWalletNewAccountButtonClick(){
  popupPrompt('What type of account?',
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

function handleWalletBackupButtonClick(){
  popupPrompt('Great idea! How would you like to back up your encrypted wallet?',
    [
      'Display it now',
      'Email it to me'
    ],
    [
      function(){
        alert('I should display your mnemonic encrypted wallet now.');
      },
      function(){
        alert('I should ask you for your email now.');
      }
    ]
  );
}

function handleWalletLogoutButtonClick(){
  navigateTo('index');
}

$('#wallet-home-new-account-button').on('click', handleWalletNewAccountButtonClick);
$('#wallet-home-backup-wallet-button').on('click', handleWalletBackupButtonClick);
$('#wallet-home-logout-button').on('click', handleWalletLogoutButtonClick);