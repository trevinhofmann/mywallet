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

function createNewAccount(name, description){
  accounts.push({
    "name": name,
    "description": description,
    "signatures": "1-of-1",
    "balance": "0.00"
  });
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
  for (var account in accounts){
    $('#wallet-home-accounts-tbody').append(function(){
      var name = accounts[account].name;
      var description = accounts[account].description;
      var signatures = accounts[account].signatures;
      var balance = accounts[account].balance;
      var callback = function(){
        switchToAccount(name);
        navigateTo('account-home');
      }
      var row = $('<tr></tr>');
      row.append($('<td></td>').append(function(){
        return $('<button type="button" class="btn btn-primary">'+name+'</button>').click(callback);
      }));
      row.append('<td>'+description+'</td>');
      row.append('<td>'+signatures+'</td>');
      row.append('<td>'+balance+'</td>');
      return row;
    });
  }
}

var accounts = [
  {
    "name": "Daily Spending",
    "description": "This is where I keep my day-to-day spendable funds.",
    "signatures": "2-of-3",
    "balance": "314.15"
  },
  {
    "name": "Vacation Fund",
    "description": "I'm going to Disney World!",
    "signatures": "2-of-3",
    "balance": "4200.42"
  },
  {
    "name": "Cold Storage",
    "description": "Saving for retirement.",
    "signatures": "4-of-5",
    "balance": "25000.00"
  }
];

displayAccounts();

$('#wallet-home-new-account-button').on('click', handleWalletNewAccountButtonClick);
$('#wallet-home-backup-wallet-button').on('click', handleWalletBackupButtonClick);
$('#wallet-home-logout-button').on('click', handleWalletLogoutButtonClick);