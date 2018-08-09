/**
 * Lite-Coin sample test transaction.
 *
 * This node script creates 2 addresses and simulates
 * a sample transaction.
 *
 * @link   URL
 * @file   litecoin.js
 * @author Aditya Taday
 * @since  08/09/2018
 */

import { liteCore } from 'litecore-lib'

/**
 * Generating random sender and receiver address
 */

// Generating privateKeys
let privateKeyOfSender = new liteCore.PrivateKey()
let privateKeyOfReceiver = new liteCore.PrivateKey()

// Generating public address
let addressOfSender = privateKeyOfSender.toAddress()
let addressOfReceiver = privateKeyOfReceiver.toAddress()


