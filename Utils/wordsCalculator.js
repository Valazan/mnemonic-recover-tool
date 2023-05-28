const bip39 = require("bip39");
const fs = require("fs");

async function calculatePossibleWords(mnemonic) {
  let missingWords = 12 - mnemonic.split(" ").length;
  let valid = [];

  try {
    let content = await fs.promises.readFile("wordlist.txt", "utf8");
    let wordlist = content.split("\n");

    for (let i = 0; i < missingWords; i++) {
      console.log("calculating %i missing word...", missingWords);
      wordlist.forEach((word) => {});
    }

    switch (missingWords) {
      case 1:
        console.log("calculating 1 missing word...");
        wordlist.forEach((word) => {
          var seedToCheck = mnemonic.concat(" ").concat(word);
          if (bip39.validateMnemonic(seedToCheck)) {
            valid.push(seedToCheck);
          }
        });
        break;
      case 2:
        console.log("calculating 2 missing words...");
        wordlist.forEach((word) => {
          wordlist.forEach((word2) => {
            var seedToCheck = mnemonic
              .concat(" ")
              .concat(word)
              .concat(" ")
              .concat(word2);
            if (bip39.validateMnemonic(seedToCheck)) {
              valid.push(seedToCheck);
            }
          });
        });
        break;
      case 3:
        console.log("calculating 3 missing words...");
        wordlist.forEach((word) => {
          wordlist.forEach((word2) => {
            wordlist.forEach((word3) => {
              var seedToCheck = mnemonic
                .concat(" ")
                .concat(word)
                .concat(" ")
                .concat(word2)
                .concat(" ")
                .concat(word3);
              if (bip39.validateMnemonic(seedToCheck)) {
                if (valid.length === 400000) {
                  writeFile(valid);
                  valid = [];
                }
                valid.push(seedToCheck);
              }
            });
          });
        });
        break;
      default:
        console.log("more than 3 missing words is not allowed");
        return [];
    }

    return valid;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function writeFile(valid) {
  let str = "";
  valid.forEach((v) => {
    str += v + "\n";
  });

  let fileName = "valid" + new Date().getTime() + ".txt";
  fs.writeFileSync(fileName, str, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  str = "";

  console.log("file written successfully", fileName);
}

function calculateAndWritePossibleWords(mnemonic) {
  calculatePossibleWords(mnemonic).then((result) => writeFile(result));
}

module.exports = { calculateAndWritePossibleWords };
