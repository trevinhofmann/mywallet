var transactions = [];

function loadTransactions(){
  transactions = [
    {
      "label": "Donation from stranger",
      "recipient": "1ThisIsAFakeAddress",
      "txid": "1234567890abcdef1234567890abcdef",
      "amount": "+3.00",
      "confirmations": "2"
    },
    {
      "label": "Payment for Tab and Mountain Dew",
      "recipient": "1DefinitelyNotARealAddress",
      "txid": "abcdefabcdefabcdefabcdefabcdefabc",
      "amount": "-13.37",
      "confirmations": "[confirmed]"
    },
    {
      "label": "Transfer from exchange",
      "recipient": "1ThisIsADifferentFakeAddress",
      "txid": "fedcba0987654321fedcba0987654321",
      "amount": "+324.52",
      "confirmations": "[confirmed]"
    }
  ];
}

function switchToAccount(accountName){
  $('#account-name').text(accountName);
  loadTransactions();
  displayTransactions();
}

function displayTransactions(){
  $('#account-home-transactions-tbody').empty();
  for (var transaction in transactions){
    var label = transactions[transaction].label;
    var recipient = transactions[transaction].recipient;
    var txid = transactions[transaction].txid;
    var amount = transactions[transaction].amount;
    var confirmations = transactions[transaction].confirmations;
    var row = $('<tr></tr>');
    row.append('<td>'+label+'</td>');
    row.append('<td>'+recipient+'</td>');
    row.append('<td>'+txid+'</td>');
    row.append('<td>'+amount+'</td>');
    row.append('<td>'+confirmations+'</td>');
    $('#account-home-transactions-tbody').append(row);
  }
}

function handleAccountSendPaymentButtonClick(){
  alert('I should ask you for payment information now.');
}

function handleAccountGetPaidButtonClick(){
  alert('I should let you create a new address and payment request now.');
}

function handleAccountListAddressesButtonClick(){
  alert('I should show you your addresses now.');
}

function handleAccountReturnButtonClick(){
  navigateTo('wallet-home');
}

function handleAccountLogoutButtonClick(){
  handleWalletLogoutButtonClick();
}


$('#account-home-send-payment-button').on('click', handleAccountSendPaymentButtonClick);
$('#account-home-get-paid-button').on('click', handleAccountGetPaidButtonClick);
$('#account-home-list-addresses-button').on('click', handleAccountListAddressesButtonClick);
$('#account-home-return-button').on('click', handleAccountReturnButtonClick);
$('#account-home-logout-button').on('click', handleAccountLogoutButtonClick);

displayTransactions();