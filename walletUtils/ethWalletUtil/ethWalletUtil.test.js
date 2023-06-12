// Test the function to calculate an eth wallet address from a mnemonic
const { mnemonicToAddress } = require("./ethWalletUtil");

describe("mnemonicToAddress", () => {
  it("should return the correct address", async () => {
    const mnemonic =
      "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

    const path = "m/44'/60'/0'/0/0";
    const address = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
    expect(await mnemonicToAddress(mnemonic, path)).toEqual(address);
  });

  it("should return the correct address with default path", async () => {
    const mnemonic =
      "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

    const address = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
    expect(await mnemonicToAddress(mnemonic)).toEqual(address);
  });
});
