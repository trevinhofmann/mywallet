// This class represents an account in a hierarchical deterministic wallet
// structure, able to contain multiple addresses
function Account(name, description, publicParentKeys, signaturesRequired){
  
  // A user-defined non-functional name for the account
  this.name = name;
  
  // A user-defined non-functional description for the account
  this.description = description;
  
  // An array of the account's addresses
  this.addresses = [];
  
  // An array of the account's transactions
  this.transactions = [];
  
  // An array of public parent keys
  this.publicParentKeys = publicParentKeys;
  
  // The number of signatures required to spend outputs to this account
  this.signaturesRequired = signaturesRequired;
  
}
  
// Adds a transaction to the account
Account.prototype.addTransaction = function(transaction){
  this.transactions.push(transaction);
}

// Calculates and returns the balance as a sum of all transaction amounts
Account.prototype.getBalance = function(){
  var balance = 0;
  for (var transaction in this.transactions){
    balance += this.transactions[transaction].amount;
  }
  return balance;
}

// Returns the 'M-of-N' format for M signatures required of N public keys in
// existence
Account.prototype.getMOfN = function(){
  return this.signaturesRequired+'-of-'+this.publicParentKeys.length;
}