// This class is a model for a Transaction as it is used in the MyWallet
// hierarchical deterministic wallet structure
function Transaction(recipient, txid, amount, confirmationHeight){

  // The address to which coins were sent
  this.recipient = recipient;
  
  // The transaction id (txid) of the transaction
  this.txid = txid;
  
  // The amount (in satoshis) received or sent in this transaction (positive =
  // received, negative = sent)
  this.amount = amount;
  
  // The heigh of the block containing this transaction (-1 if not yet in a
  // block)
  this.confirmationHeight = confirmationHeight;
  
  this.getConfirmations = function(){
    // TODO: Return (blockChainHeight - this.confirmationHeight) instead
    return 6;
  }

}