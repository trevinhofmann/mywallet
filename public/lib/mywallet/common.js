var bitcore = require('bitcore');

var displays = [
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

function navigateTo(target){
  for (var display in displays){
    $('#'+displays[display]).hide();
  }
  $('#'+target).show();
}

navigateTo('index');