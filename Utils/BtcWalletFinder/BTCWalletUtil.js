var bitcore = require("bitcore-lib");

// Calculate a BTC wallet address from a mnemonic

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
    btcAddress: getBTCAddress(publicKey),
  };
}

// Get the BTC wallet address from a public key using bitcore

function getBTCAddress(bitcorePublicKey) {
  return new bitcore.Address(
    bitcorePublicKey,
    bitcore.Networks.mainnet,
    "witnesspubkeyhash"
  ).toString();
}

module.exports = { mnemonicToAddress };
