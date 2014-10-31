var currentAccount;

function switchToAccount(account){
  currentAccount = account;
  displayAccount();
}

function displayAccount(){
  $('#account-name').text(wallet[currentAccount].name);
  displayTransactions();
}

function displayTransactions(){
  $('#account-home-transactions-tbody').empty();
  for (var transaction in wallet[currentAccount].transactions){
    var tx = wallet[currentAccount].transactions[transaction];
    var row = $('<tr></tr>');
    row.append('<td>'+tx.label+'</td>');
    row.append('<td><a href="http://mychain.io/address/'+tx.recipient+'">'+tx.recipient+'</a></td>');
    row.append('<td><a href="http://mychain.io/tx/'+tx.txid+'">'+tx.txid+'</a></td>');
    row.append('<td>'+tx.amount/100000+'</td>');
    row.append('<td>'+tx.confirmations+'</td>');
    $('#account-home-transactions-tbody').append(row);
  }
}

function handleAccountSendPaymentButtonClick(){
  navigateTo('send');
}

function handleAccountGetPaidButtonClick(){
  navigateTo('receive');
}

function handleAccountListAddressesButtonClick(){
  navigateTo('addresses');
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