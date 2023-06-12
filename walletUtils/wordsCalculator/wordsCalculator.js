const bip39 = require("bip39");
const fs = require("fs");

async function calculatePossibleWords(mnemonic) {
  let missingWords = 12 - mnemonic.split(" ").length;
  let valid = [];

  try {
    let content = await fs.promises.readFile(
      "walletUtils/wordsCalculator/wordlist.txt",
      "utf8"
    );
    const { EOL } = require("os");
    let wordlist = content.split(EOL);

    if (missingWords > 2) {
      throw new Error("More than two missing words is not allowed");
    }
    let mnemonicToValidate = [];

    if (missingWords == 1) {
      mnemonicToValidate = wordlist.map((word) =>
        mnemonic.concat(" ").concat(word)
      );
    } else {
      mnemonicToValidate = computeCombinationPair(wordlist, mnemonic);
    }
    valid = validateMnemonic(mnemonicToValidate);
    return valid;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function computeCombinationPair(array, mnemonic) {
  return array.flatMap((v, i) =>
    array.slice(i + 1).map((w) => mnemonic + " " + v + " " + w)
  );
}

function validateMnemonic(mnemonicToValidate) {
  return mnemonicToValidate.filter((computedMnemonic) =>
    bip39.validateMnemonic(computedMnemonic)
  );
}

function writeFile(valid, relativePath) {
  let str = "";
  valid.forEach((v) => {
    str += v + "\n";
  });

  if (!fs.existsSync(relativePath)) {
    fs.mkdirSync(relativePath);
  }

  let fileName = relativePath + "/" + "valid" + new Date().getTime() + ".txt";
  fs.writeFileSync(fileName, str, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  str = "";

  console.log("file written successfully", fileName);
  return fileName;
}

async function calculateAndWritePossibleWords(mnemonic, relativePath) {
  const result = await calculatePossibleWords(mnemonic);
  return writeFile(result, relativePath);
}

module.exports = { calculateAndWritePossibleWords };
