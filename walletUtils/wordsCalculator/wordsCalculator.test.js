const wordsCalcultator = require("./wordsCalculator");
const bip39 = require("bip39");
const fs = require("fs");

describe("wordsCalcultator", () => {
  let mnemonic;
  beforeEach(() => {
    mnemonic = bip39.generateMnemonic(128);
  });

  it("should write the list of valid keywords", async () => {
    const incompleteMnemonic = mnemonic
      .split(" ")
      .splice(0, 11)
      .reduce((accumulator, currentValue) => accumulator + " " + currentValue);
    const filename = await wordsCalcultator.calculateAndWritePossibleWords(
      incompleteMnemonic,
      "output"
    );

    // read in output folder the file wih the name filename
    const content = await fs.promises.readFile(filename, "utf8");

    expect(content).not.toBeNull();
    expect(content).not.toBeUndefined();
    expect(content).not.toBe("");

    // remove the file
    fs.rmSync(filename);
  });
});
