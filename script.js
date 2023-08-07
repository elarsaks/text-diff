// This hash will be used as the first element in every LCS.
const hash = "e6783d7aaf8bb4";

// Set output text
function setOutPut(text) {
  const output = document.querySelector("#output");
  output.innerHTML = text;
}

// Divide string into sentences or words
function divideStringIntoSentences(string) {
  return string.match(/[^\.!\?]+[\.!\?]+/g)
    ? string.match(/[^\.!\?]+[\.!\?]+/g).map((sen) => sen.split(" "))
    : string.split(" ");
}

// Compare multiple sentences and output differences
function compareMultipleSentences(listX, listY) {
  listX.forEach((sen) => sen.unshift(hash));
  listY.forEach((sen) => sen.unshift(hash));

  listX.length !== listY.length
    ? setOutPut(`<h2 style="color:#ff1145; font-weight: 200; text-align: center;">
                Text boxes must have the same number of sentences! </h2>`)
    : setOutPut(
        listX
          .map((sen, i) =>
            getDiff(lcsLengths(sen, listY[i]), sen, listY[i]).join(" ")
          )
          .join(" ")
      );
}

// Compare a single sentence and output differences
function compareSingleSentence(listX, listY) {
  listX.unshift(hash);
  listY.unshift(hash);
  setOutPut(getDiff(lcsLengths(listX, listY), listX, listY).join(" "));
}

// Main comparison controller
function compare() {
  const listX = divideStringIntoSentences(
    document.getElementById("left-input").value
  );
  const listY = divideStringIntoSentences(
    document.getElementById("right-input").value
  );

  Array.isArray(listX[0]) && Array.isArray(listY[0])
    ? compareMultipleSentences(listX, listY)
    : compareSingleSentence(listX, listY);
}

// Create a matrix and map LCS lengths onto it
function lcsLengths(listX, listY) {
  const lenX = listX.length;
  const lenY = listY.length;

  // Initialize matrix with zeros
  const memo = Array.from({ length: lenX + 1 }, () => Array(lenY + 1).fill(0));

  // Populate matrix with LCS lengths
  for (let i = 1; i <= lenX; i++) {
    for (let j = 1; j <= lenY; j++) {
      memo[i][j] =
        listX[i - 1] === listY[j - 1]
          ? memo[i - 1][j - 1] + 1
          : Math.max(memo[i][j - 1], memo[i - 1][j]);
    }
  }

  return memo;
}

// Determine string differences and return the final string
function getDiff(memo, listX, listY) {
  const finalString = [];

  // Backtrack values from the matrix to determine differences
  function lcsBackTrack(memo, listX, listY, posX, posY) {
    if (posX === 0 || posY === 0) return "";

    if (
      listX[posX - 1] === listY[posY - 1] &&
      memo[posX][posY - 1] < memo[posX][posY]
    ) {
      finalString.push(listX[posX - 1]);
      return (
        lcsBackTrack(memo, listX, listY, posX - 1, posY - 1) + listX[posX - 1]
      );
    } else {
      if (memo[posX][posY - 1] > memo[posX - 1][posY]) {
        finalString.push(`<ins>${listY[posY - 1]}</ins>`);
        return lcsBackTrack(memo, listX, listY, posX, posY - 1);
      } else {
        finalString.push(`<del>${listX[posX - 1]}</del>`);
        return lcsBackTrack(memo, listX, listY, posX - 1, posY);
      }
    }
  }

  lcsBackTrack(memo, listX, listY, listX.length, listY.length);
  return finalString.filter((word) => word !== hash).reverse();
}

// Test inputs
const testInput1 = `Take a minute to watch a couple of example inputs.
First sentence has a word to it.
Followed by a sentence with the word removed from it.
Third sentence has a word and removed from it.
sentence is about changing the first word of the sentence (because it might stay out of LCS).
Completely different string totally changed to show indexing of words.
Finally we have the the symbols in LCS.
`;

const testInput2 = `Take a minute to watch a couple of example inputs.
First sentence has a word added to it.
Followed by a sentence with the word from it.
Third sentence has a word added and from it.
Fourth is about changing the first word of the sentence (because it might stay out of LCS).
And now we have a string to show the indexing of words.
Finally we have the the consecutive repeating repeating the symbols in LCS.
`;

// Run test example on page load
window.addEventListener("load", function () {
  const input1 = document.getElementById("left-input");
  const input2 = document.getElementById("right-input");
  let i = 0;

  const interval = setInterval(() => {
    if (i < testInput1.length) {
      input1.value += testInput1[i];
    }
    if (i < testInput2.length) {
      input2.value += testInput2[i];
    }
    i++;
    compare();

    if (i >= Math.max(testInput1.length, testInput2.length)) {
      clearInterval(interval);
      setTimeout(() => {
        input1.value = "";
        input2.value = "";
        setOutPut(`<h2 style="color:green; font-weight: 200; text-align: center;">
                        You can now enter your own text to test the application! </h2>`);
      }, 7300);
    }
  }, 150);
});

// Add event listener for the compare button
document.getElementById("compare-button").addEventListener("click", compare);
