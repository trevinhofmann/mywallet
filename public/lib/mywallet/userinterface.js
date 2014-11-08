// This class handles the HTML DOM elements and events, which includes tasks
// such as updating table displays and handling button clicks
function UserInterface(){

  // An array of pages displayed in the application
  this.displays = [
    'index',
    'login-grid',
    'wallet-home',
    'account-home',
    'send',
    'receive',
    'settings',
    'addresses',
    'transactions'
  ];
  
  this.currencyDenomination = 'mBTC';
  this.currencyPrecision = 2;

}
  
// Hides the loading screen, displays the main application, and attaches event
// handlers
UserInterface.prototype.open = function(){
  $('#loader').hide();
  $('#prompt').hide();
  $('#main').removeClass('hidden');
  this.attachEventHandlers();
  this.navigateTo('index');
};

// Switches the display to a given target
UserInterface.prototype.navigateTo = function(target){
  for (var display in this.displays){
    $('#'+this.displays[display]).hide();
  }
  $('#'+target).show();
};

// Pops up a prompt asking the user to make a selection, then calls the
// corresponding callback function
UserInterface.prototype.popupPrompt = function(prompt, choices, callbacks){
  $('#prompt-title').text(prompt);
  $('#prompt-options').empty();
  for (var choice in choices){
    $('#prompt-options').append(function(){
      var callback = callbacks[choice];
      return $('<br><button type="button" class="btn btn-primary btn-lg btn-block">'+choices[choice]+'</button>').click(function(){
        $('#prompt').hide();
        callback();
      });
    });
  }
  $('#prompt').show();
};

// Pops up a prompt asking the user to input a text value, then calls the
// callback function with the value entered when the user clicks a 'Submit'
// button
UserInterface.prototype.popupTextPrompt = function(prompt, callback){
  $('#prompt-title').text(prompt);
  $('#prompt-options').empty();
  $('#prompt-options').append('<input type="text" id="popupInput" class="form-control spaced"><br>');
  $('#prompt-options').append(function(){
    return $('<button type="button" class="btn btn-primary btn-lg btn-block">Submit</button>').click(function(){
      var value = $('#popupInput').val();
      $('#prompt').hide();
      callback(value);
    });
  });
  $('#prompt').show();
};

// Attaches event handlers to elements, particularly event handlers for button
// clicks
UserInterface.prototype.attachEventHandlers = function(){
  $('#wallet-home-new-account-button').on('click',
    this.handleWalletNewAccountButtonClick
  );
  $('#wallet-home-backup-wallet-button').on('click',
    this.handleWalletBackupButtonClick
  );
  $('#wallet-home-settings-button').on('click',
    this.handleWalletSettingsButtonClick
  );
  $('#wallet-home-logout-button').on('click',
    this.handleWalletLogoutButtonClick
  );
  $('#account-home-send-payment-button').on('click',
    this.handleAccountSendPaymentButtonClick
  );
  $('#account-home-get-paid-button').on('click',
    this.handleAccountGetPaidButtonClick
  );
  $('#account-home-list-addresses-button').on('click',
    this.handleAccountListAddressesButtonClick
  );
  $('#account-home-return-button').on('click',
    this.handleAccountReturnButtonClick
  );
  $('#account-home-logout-button').on('click',
    this.handleAccountLogoutButtonClick
  );
  $('#index-new-button').on('click',
    this.handleIndexNewButtonClick
  );
  $('#index-login-button').on('click',
    this.handleIndexLoginButtonClick
  );
  $('#settings-save-button').on('click',
    this.handleSettingsSaveButtonClick
  );
  $('#settings-cancel-button').on('click',
    this.handleSettingsCancelButtonClick
  );
};

// Update the account display to show the current account's name and
// transactions
UserInterface.prototype.displayAccount = function(){
  $('#account-name').text(wallet.getCurrentAccount().name);
  this.displayTransactions();
};

// Update and display the list of accounts on the wallet home page
UserInterface.prototype.displayAccounts = function(){
  $('#wallet-home-accounts-tbody').empty();
  for (var account in wallet.accounts){
    var name = wallet.accounts[account].name;
    var row = $('<tr></tr>');
    var button = $('<button type="button" id="account-'+account+'-button" account="'+account+'" class="btn btn-primary btn-block">'+name+'</button>');
    button.on('click', function(){
      var account = $(this).attr('account');
      wallet.switchToAccount(account);
      userInterface.displayAccount();
      userInterface.navigateTo('account-home');
    });
    row.append($('<td></td>').append(button));
    row.append('<td>'+wallet.accounts[account].description+'</td>');
    row.append('<td>'+wallet.accounts[account].signatures+'</td>');
    row.append('<td>'+this.formatCurrency(wallet.getAccountBalance(account))+'</td>');
    $('#wallet-home-accounts-tbody').append(row);
  }
  $('#wallet-home-balance-head').text('Balance ('+this.currencyDenomination+')');
};

// Format an amount in satoshis to the denomination and precision specified in
// the settings
UserInterface.prototype.formatCurrency = function(amount){
  var d;
  switch (this.currencyDenomination){
    case 'BTC':
      d = 100000000;
      break;
    case 'mBTC':
      d = 100000;
      break;
    case 'μBTC':
    case 'bits':
      d = 100;
      break;
    case 'satoshis':
      d = 1;
      break;
  }
  var p = Math.pow(10, this.currencyPrecision);
  return (Math.floor(amount * p / d) / p).toFixed(this.currencyPrecision);
}

// Update the transactions display for the currently open account
UserInterface.prototype.displayTransactions = function(){
  $('#account-home-transactions-tbody').empty();
  var transactions = wallet.getCurrentAccount().transactions;
  for (var transaction in transactions){
    var tx = transactions[transaction];
    var row = $('<tr></tr>');
    row.append('<td>'+tx.label+'</td>');
    row.append('<td><a href="http://mychain.io/address/'+tx.recipient+'">'+tx.recipient+'</a></td>');
    row.append('<td><a href="http://mychain.io/tx/'+tx.txid+'">'+tx.txid+'</a></td>');
    row.append('<td>'+this.formatCurrency(tx.amount)+'</td>');
    row.append('<td>'+tx.confirmations+'</td>');
    $('#account-home-transactions-tbody').append(row);
  }
  $('#account-home-amount-head').text('Amount ('+this.currencyDenomination+')');
};

// Ask the user for more information about the simple account, then create it
UserInterface.prototype.createSimpleAccount = function(){
  userInterface.askForNewAccountName(function(newAccountName){
    userInterface.askForNewAccountDescription(function(newAccountDescription){
      wallet.addAccount(new Account(newAccountName, newAccountDescription, ['blah', 'bleh'], 2));
      userInterface.displayAccounts();
    });
  });
};

// Ask the user for more information about the simple two-factor account, then
//create it
UserInterface.prototype.createSimpleTwoFactorAccount = function(){
  userInterface.askForNewAccountName(function(newAccountName){
    userInterface.askForNewAccountDescription(function(newAccountDescription){
      wallet.addAccount(new Account(newAccountName, newAccountDescription, ['blah'], 1));
      userInterface.displayAccounts();
    });
  });
};

// Ask the user for a new account name
UserInterface.prototype.askForNewAccountName = function(callback){
  userInterface.popupTextPrompt(
    'What would you like to call this wallet?',
    callback
  );
};

// Ask the user for a new account description
UserInterface.prototype.askForNewAccountDescription = function(callback){
  userInterface.popupTextPrompt(
    'Enter a short description for the account (optional):',
    callback
  );
};

// Ask the user what type of account they would like to make, then begin
// making that account
UserInterface.prototype.handleWalletNewAccountButtonClick = function(){
  userInterface.popupPrompt('What type of account would you like to make?',
    [
      'Super Simple (1 key)',
      'Simple Two-Factor (2 keys, we hold one)',
      'Custom Multisignature (completely customizable!)'
    ],
    [
      userInterface.createSimpleAccount,
      userInterface.createSimpleTwoFactorAccount,
      function(){
        alert('I should ask for the multisignature details now.');
      }
    ]
  );
};

// Prompt the user for a backup method, then provide the backup
UserInterface.prototype.handleWalletBackupButtonClick = function(){
  userInterface.popupPrompt('Great idea! How would you like to back up your encrypted wallet?',
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
};

// Navigate to the 'settings' page
UserInterface.prototype.handleWalletSettingsButtonClick = function(){
  userInterface.navigateTo('settings');
};

// Log out of the wallet
UserInterface.prototype.handleWalletLogoutButtonClick = function(){
  wallet.logOut();
};

// Navigate to the 'send' page
UserInterface.prototype.handleAccountSendPaymentButtonClick = function(){
  userInterface.navigateTo('send');
};

// Navigate to the 'receive' page
UserInterface.prototype.handleAccountGetPaidButtonClick = function(){
  userInterface.navigateTo('receive');
};

// Navigate to the 'addresses' page
UserInterface.prototype.handleAccountListAddressesButtonClick = function(){
  userInterface.navigateTo('addresses');
};

// Navigate back to the wallet home
UserInterface.prototype.handleAccountReturnButtonClick = function(){
  userInterface.navigateTo('wallet-home');
};

// Log out of the wallet
UserInterface.prototype.handleAccountLogoutButtonClick = function(){
  wallet.logOut();
};  

// Create a new wallet after offering a quick tutorial
UserInterface.prototype.handleIndexNewButtonClick = function(){
  userInterface.popupPrompt('Would you like a quick tutorial of MyWallet?',
    [
      'Yes, please!',
      'No thanks!'
    ],
    [
      function(){
        alert('I should show you a tutorial now, but I am not ready for that yet. I will show you a demo wallet instead.');
        userInterface.navigateTo('wallet-home');
        userInterface.displayAccounts();
      },
      function(){
        userInterface.navigateTo('wallet-home');
        userInterface.displayAccounts();
      }
    ]
  );
};

// Prompt the user for a login method, then allow them to log in
UserInterface.prototype.handleIndexLoginButtonClick = function(){
  userInterface.popupPrompt('How would you like to login?',
    [
      'Grid Sequence',
      'Mnemonic Passphrase'
    ],
    [
      function(){
        alert('I should show you the login grid now, but I am not ready for that yet. I will show you a demo wallet instead.');
        userInterface.navigateTo('wallet-home');
        userInterface.displayAccounts();
      },
      function(){
        alert('I should ask you for your mnemonic passphrase now, but I am not ready for that yet. I will show you a demo wallet instead.');
        userInterface.navigateTo('wallet-home');
        userInterface.displayAccounts();
      }
    ]
  );
};

// Save the settings and navigate back to account-home
UserInterface.prototype.handleSettingsSaveButtonClick = function(){
  userInterface.currencyDenomination = $('#settings-denomination').val();
  userInterface.currencyPrecision = $('#settings-precision').val();
  userInterface.displayAccounts();
  userInterface.navigateTo('wallet-home');
}