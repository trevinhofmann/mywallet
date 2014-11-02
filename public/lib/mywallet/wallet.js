// This class is a hierarchical deterministic wallet structure, able to contain
// multiple accounts
function Wallet(){

  // An array of BIP 32 accounts
  this.accounts = [];
  
  // BIP 32 seed
  this.seed;
  
  // If set to an integer, the account number currently open
  this.currentAccountNumber;
  
}

// Add an account to the wallet
Wallet.prototype.addAccount = function(account){
  this.accounts.push(account);
};

// Add a transaction to an account
Wallet.prototype.addTransaction = function(transaction, accountNumber){
  if (accountNumber === undefined){
    accountNumber = this.currentAccountNumber;
  }
  this.accounts[accountNumber].addTransaction(transaction);
}

// Returns an account's balance
Wallet.prototype.getAccountBalance = function(accountNumber){
  if (accountNumber === undefined){
    accountNumber = this.currentAccountNumber;
  }
  return this.accounts[accountNumber].getBalance();
}

// Sets the currenAccount to a new account number
Wallet.prototype.switchToAccount = function(account){
  this.currentAccountNumber = account;
}

// Returns the currently open account
Wallet.prototype.getCurrentAccount = function(){
  return this.accounts[this.currentAccountNumber];
}

// Clears the wallet's values and navigates to the index page
Wallet.prototype.logOut = function(){
  this.accounts = [];
  this.seed = undefined;
  this.currentAccountNumber = undefined;
  userInterface.navigateTo('index');
}