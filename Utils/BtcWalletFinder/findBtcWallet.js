var bip39 = require("bip39");
var Mnemonic = require("bitcore-mnemonic");
var bitcore = require("bitcore-lib");
const { permute } = require("../permutation/permutationUtil");

let permutations = permute("".split(" "));

let counter = 0;
console.time();
for (const phrase of permutations) {
  const phraseToCheck = phrase.join(" ");
  if (bip39.validateMnemonic(phraseToCheck)) {
    const mnemonic = new Mnemonic(phraseToCheck);
    const data = mnemonicToAddress(mnemonic);
    if (data.btcAddress === "") {
      console.log(data);
    }
  }
  counter += 1;
  if (counter == 100000) {
    console.timeEnd();
    console.log(counter);
    counter = 0;
    console.time();
  }
}

function mnemonicToAddress(mnemonic) {
  const xpriv = mnemonic.toHDPrivateKey(bitcore.Networks.livenet);
  const derived = xpriv.derive("m/0'");
  const privateKey = derived.privateKey;
  const pk = new bitcore.PrivateKey(
    privateKey.toString(),
    bitcore.Networks.mainnet
  );

  const privateKeyStr = pk.toString();
  const publicKey = new bitcore.PublicKey(pk);
  const publicKeyStr = publicKey.toString();
  return {
    privateKeyStr: privateKeyStr,
    publicKeyStr: publicKeyStr,
    btcAddress: new bitcore.Address(
      publicKey,
      bitcore.Networks.mainnet,
      "witnesspubkeyhash"
    ).toString(),
  };
}
