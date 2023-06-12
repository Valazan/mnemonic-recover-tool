// Test file to Calculate a BTC wallet address from a mnemonic

const bip39 = require("bip39");
const Mnemonic = require("bitcore-mnemonic");
const { mnemonicToAddress } = require("./BTCWalletUtil");

describe("BTC utilities", () => {
  it("should calculate a BTC wallet address from a mnemonic", () => {
    const mnemonic = bip39.generateMnemonic(128);
    const mnemonicToCheck = new Mnemonic(mnemonic);
    const data = mnemonicToAddress(mnemonicToCheck);
    expect(data.btcAddress).not.toBeNull();
    expect(data.btcAddress).not.toBeUndefined();
    expect(data.btcAddress).not.toBe("");
  });
});
