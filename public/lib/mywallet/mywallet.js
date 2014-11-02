// ==============================================================
// ==   This is the main script for the MyWallet application   ==
// ==============================================================

// The global instance of the User Interface
var userInterface;

// The global instance of the Wallet
var wallet;

$(document).ready(function(){

  // Instantiate the userInterface
  userInterface = new UserInterface();

  // Instantiate the wallet
  wallet = new Wallet();
  
  // Closes the loading screen and opens the application interface
  userInterface.open();

});