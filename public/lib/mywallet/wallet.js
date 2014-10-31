var wallet = [];

var seed;

function loadDemoWallet(){
  createNewAccount('Daily Spending', 'This is where I keep my day-to-day spendable funds.', '1-of-1');
  createNewAccount('Vacation Fund', 'I am going to Disney World!', '3-of-4');
  createNewAccount('Cold Storage', 'Saving for retirement.', '4-of-5');
  addNewTransaction(0, 'Donation from a stranger', '1ThisIsAFakeAddress', '1234567890abcdef1234567890abcdef', '+3.00', '2');
  addNewTransaction(0, 'Payment for Tab and Mountain Dew', '1DefinitelyNotARealAddress', 'abcdefabcdefabcdefabcdefabcdefabc', '-13.37', '[confirmed]');
  addNewTransaction(0, 'Transfer from exchange', '1ThisIsADifferentFakeAddress', 'fedcba0987654321fedcba0987654321', '+324.52', '[confirmed]');
}

function createNewAccount(name, description, signatures){
  wallet.push({
    "name": name,
    "description": description,
    "signatures": signatures,
    "balance": "0.00",
    "transactions": []
  });
}

function addNewTransaction(account, label, recipient, txid, amount, confirmations){
  wallet[account].transactions.push({
    "label": label,
    "recipient": recipient,
    "txid": txid,
    "amount": amount,
    "confirmations": confirmations
  });
}

loadDemoWallet();