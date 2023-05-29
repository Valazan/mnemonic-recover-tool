// myClass.test.js
const wordsCalcultator = require("./wordsCalculator");
const bip39 = require("bip39");

describe("wordsCalcultator", () => {
  let mnemonic;
  beforeEach(() => {
    mnemonic = bip39.generateMnemonic(128);
  });

  it("should write the list of valid keywords", async () => {
    const incompleteMnemonic = mnemonic
      .split(" ")
      .splice(0, 10)
      .reduce((accumulator, currentValue) => accumulator + " " + currentValue);
    await wordsCalcultator.calculateAndWritePossibleWords(incompleteMnemonic);
  });
});
