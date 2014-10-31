function handleWalletNewAccountButtonClick(){
  popupPrompt('What type of account would you like to make?',
    [
      'Super Simple (1 key)',
      'Simple Two-Factor (2 keys, we hold one)',
      'Custom Multisignature (completely customizable!)'
    ],
    [
      function(){
        askForNewAccountName(function(newAccountName){
          askForNewAccountDescription(function(newAccountDescription){
            createNewAccount(newAccountName, newAccountDescription);
            displayAccounts();
          });
        });
      },
      function(){
        alert('I should create a simple two-factor account now.');
      },
      function(){
        alert('I should ask what type of multisignature account you want now.');
      }
    ]
  );
}

function askForNewAccountName(callback){
  popupTextPrompt('What would you like to call this account?', callback);
}

function askForNewAccountDescription(callback){
  popupTextPrompt('Enter a short description for the account (optional):', callback);
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

function displayAccounts(){
  $('#wallet-home-accounts-tbody').empty();
  for (var account in wallet){
    var name = wallet[account].name;
    var row = $('<tr></tr>');
    var button = $('<button type="button" id="account-'+account+'-button" account="'+account+'" class="btn btn-primary btn-block">'+name+'</button>');
    button.on('click', function(){
      var account = $(this).attr('account');
      switchToAccount(account);
      displayAccount();
      navigateTo('account-home');
    });
    row.append($('<td></td>').append(button));
    row.append('<td>'+wallet[account].description+'</td>');
    row.append('<td>'+wallet[account].signatures+'</td>');
    row.append('<td>'+wallet[account].balance+'</td>');
    $('#wallet-home-accounts-tbody').append(row);
  }
}

$('#wallet-home-new-account-button').on('click', handleWalletNewAccountButtonClick);
$('#wallet-home-backup-wallet-button').on('click', handleWalletBackupButtonClick);
$('#wallet-home-logout-button').on('click', handleWalletLogoutButtonClick);