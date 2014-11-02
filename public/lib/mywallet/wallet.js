// This class is a hierarchical deterministic wallet structure, able to contain
// multiple accounts
function Wallet(){

  // An array of BIP 32 accounts
  this.accounts = [];
  
  // BIP 32 seed
  this.seed;
  
  // If set to an integer, the account number currently open
  this.currentAccountNumber;
  
  // Add an account to the wallet
  this.addAccount = function(account){
    this.accounts.push(account);
  }
  
  // Add a transaction to an account
  this.addTransaction = function(transaction, accountNumber){
    if (accountNumber === undefined){
      accountNumber = this.currentAccount;
    }
    this.accounts[accountNumber].addTransaction(transaction);
  }
  
  // Returns an account's balance
  this.getAccountBalance = function(accountNumber){
    if (accountNumber === undefined){
      accountNumber = this.currentAccount;
    }
    return this.accounts[accountNumber].getBalance();
  }
  
  // Sets the currenAccount to a new account number
  this.switchToAccount = function(account){
    currentAccount = account;
  }
  
  // Returns the currently open account
  this.getCurrentAccount = function(){
    return this.accounts[this.currentAccountNumber];
  }
  
  this.logOut = function(){
    this.accounts = [];
    this.seed = undefined;
    this.currentAccountNumber = undefined;
    userInterface.navigateTo('index');
  }
  
}