/**
 * Lite-Coin sample test transaction.
 *
 * This node script creates 2 addresses and simulates
 * a sample transaction.
 *
 * @link   https://github.com/adityataday/sample-lite_coin-transaction
 * @file   litecoin.js
 * @author Aditya Taday
 * @since  08/09/2018
 */

/**
 * Requiring all the dependancies for the project
 */
var liteCore = require('litecore-lib')
var explorers = require('bitcore-explorers')

// Importing privateKeys from pre-generated WIF
let privateKeyOfSender = liteCore.PrivateKey.fromWIF('cSSXSYyMAJCEUTayap99RJdHsfdGixezmKNJQpZwaNEd26H9zB5U')
let privateKeyOfReceiver = liteCore.PrivateKey.fromWIF('cSBpLEwRdwZ25BsqrqcqGcD7fEsfo5tbkBEHXV1AybHZdcqcQoLL')

// Generating public address
let addressOfSender = privateKeyOfSender.toAddress()
let addressOfReceiver = privateKeyOfReceiver.toAddress()

// Printing out the address
console.log('Address of sender: ' + addressOfSender)
console.log('Address of sender: ' + addressOfReceiver)

let insight = new explorers.Insight('testnet')
let transaction

// Generating unspentUTXOs
insight.getUnspentUtxos(addressOfSender, function (err, utxos) {
  if (err) {
    // Handle errors...
    console.log('We have a problem getting UTXOS')
  } else {
    console.log('Obtaining the UTXOS\n\n')
    console.log(utxos)
    transaction = liteCore.Transaction()
      .from(utxos)
      .to(addressOfReceiver, 10000)
      .change(addressOfSender)
      .sign(privateKeyOfSender)
      .serialize()

    console.log('\n\nBroadcasting the transation now\n\n')

    // Broadcasting a transation to the test net
    insight.broadcast(transaction, function (err, returnedTxId) {
      if (err) {
        // handle errors
        console.log('We have a problem broadcasting')
      } else {
        // Mark the transaction as broadcasted
        console.log('Sucessful broadcast: ' + returnedTxId)
      }
    })
  }
})
