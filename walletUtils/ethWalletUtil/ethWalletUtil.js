var hdkey = require("ethereumjs-wallet/hdkey");
var bip39 = require("bip39");
const fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443")
);

// Convert a mnemonic phrase to an ethereum address
// @param {string} mnemonic - The mnemonic phrase to convert
// @param {string} path - The path to use
// @returns {string} The ethereum address
async function mnemonicToAddress(mnemonic, path) {
  if (path == null) {
    path = "m/44'/60'/0'/0/0";
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  var hdwallet = hdkey.fromMasterSeed(seed);
  var wallet = hdwallet.derivePath(path).getWallet();
  return "0x" + wallet.getAddress().toString("hex");
}

module.exports = { mnemonicToAddress };
