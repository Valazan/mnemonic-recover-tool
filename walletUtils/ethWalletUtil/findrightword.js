var hdkey = require("ethereumjs-wallet/hdkey");
var bip39 = require("bip39");
const fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443")
);

const args = process.argv.slice(2);
let fileName = args[0];
console.log("checking", fileName);

var path = "m/44'/60'/0'/0/0";
var counter = 0;
var addressToCheck = "".toLowerCase();
fs.readFile(fileName, "utf8", function (err, content) {
  let mnemonic = content.split("\n");
  mnemonic.forEach((m) => {
    bip39.mnemonicToSeed(m).then(function (seed) {
      var hdwallet = hdkey.fromMasterSeed(seed);
      var wallet = hdwallet.derivePath(path).getWallet();
      var address = "0x" + wallet.getAddress().toString("hex");
      if (address == addressToCheck) {
        console.log("BINGO", m);
      }

      if (addressToCheck.length === 0) {
        asyncCall(address);
      }
    });
  });

  fs.rename(fileName, "Checked" + fileName, function (err) {
    if (err) throw err;
    console.log("Successfully renamed");
  });
});

async function asyncCall(address) {
  let result = await web3.eth.getBalance(address);
  console.log(result);

  if (result > 0) {
    console.log(
      web3.utils.fromWei(result, "BNB") + " BNB on address " + address
    );
  }
}
