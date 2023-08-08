# Text-Diff

Text-Diff is a user-friendly tool designed to compare and highlight differences between two text inputs. It's inspired by the [diff](https://en.wikipedia.org/wiki/Diff) utility, which is traditionally used to show differences between two files.

## Try it Out

- **Online**: <a href="https://elarsaks.github.io/text-diff/" target="_blank">Visit our hosted version</a>
- **Locally**: Download the `index.html` file and open it in your preferred web browser.

## Features

- **Technologies**: Developed using HTML, CSS, and JavaScript.
- **Algorithm**: Employs the [Longest Common Subsequence (LCS)](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem) algorithm to efficiently identify and display differences between two strings.

## Limitations

- **Sentence Comparison**: The tool compares texts sentence-by-sentence. Both inputs must have an equal number of sentences for accurate comparison.
- **Word-Level Accuracy**: Differences are highlighted at the word level, not character level.
- **Sentence Endings**: Punctuation marks (e.g., `.`, `!`, `?`) at the end of sentences are considered part of the last word.

## Preview

![Text-Diff Screenshot](https://s3.eu-north-1.amazonaws.com/elar-saks.info/text-diff.png)
