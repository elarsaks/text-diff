# Text-Diff

**Text-Diff** is a user-friendly tool designed to compare and highlight differences between two pieces of text. It's inspired by the [diff](https://en.wikipedia.org/wiki/Diff) utility, traditionally used to show differences between two files.

## Try It Out

- **Online**: <a href="https://elarsaks.github.io/text-diff/" target="_blank">Visit the hosted version</a>  
- **Locally**: Download the `index.html` file and open it in your preferred web browser.

## Features

- **Technologies**: Built with HTML, CSS, and JavaScript.
- **Algorithm**: Uses the [Longest Common Subsequence (LCS)](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem) algorithm to efficiently detect and display differences between two strings.

## Limitations

- **Sentence Comparison**: The tool compares texts on a sentence-by-sentence basis. Both inputs must contain the same number of sentences for accurate comparison.
- **Word-Level Accuracy**: Differences are highlighted at the word level rather than the character level.
- **Sentence Endings**: Punctuation marks (e.g., `.`, `!`, `?`) at the end of sentences are considered part of the final word.

## Preview

![Text-Diff Screenshot](https://s3.eu-north-1.amazonaws.com/elar-saks.info/text-diff.png)
