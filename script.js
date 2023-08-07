/**
 * Text Comparison Tool
 *
 * This web application allows users to compare two pieces of text and visually see the differences between them.
 * Differences are highlighted with the following conventions:
 * - <ins> tags indicate added words.
 * - <del> tags indicate removed words.
 *
 * Users can input single sentences or multiple sentences for comparison. The application will then display the differences
 * between the two inputs, highlighting added or removed words.
 */

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
          .join("<br>")
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

//* DUMMY DATA

// Test inputs
const testInput1 = `𝗧𝗲𝘅𝘁 𝗖𝗼𝗺𝗽𝗮𝗿𝗶𝘀𝗼𝗻 𝗧𝗼𝗼𝗹. 
This web application allows users to compare two pieces of text and visually see the differences between them.
Observe the example inputs below.
The first sentence has a word missing.
The next sentence has the word removed.
The third sentence has a word and it's removed.
This sentence demonstrates changing the first word (as it might be excluded from LCS).
Here's a completely different string to showcase word indexing.
Lastly, we demonstrate symbols in the LCS.
`;

const testInput2 = `𝗧𝗲𝘅𝘁 𝗖𝗼𝗺𝗽𝗮𝗿𝗶𝘀𝗼𝗻 𝗧𝗼𝗼𝗹. 
This web application allows users to compare two pieces of text and visually see the differences between them.
Observe the example inputs below.
The first sentence has a word added.
The next sentence omits the word.
The third sentence has a word added and removed.
This sentence is about changing the first word (as it might be excluded from LCS).
Now, we present a string to demonstrate word indexing.
Lastly, we show consecutive repeating symbols in the LCS.
`;

//* RUN TEST EXAMPLE ON PAGE LOAD ///

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
      /*  setTimeout(() => {
        input1.value = "";
        input2.value = "";
        setOutPut(`<h2 style="color:green; font-weight: 200; text-align: center;">
                        You can now enter your own text to test the application! </h2>`);
      }, 10000); */
    }
  }, 10);
});

// Add event listener for the compare button
document.getElementById("compare-button").addEventListener("click", compare);
