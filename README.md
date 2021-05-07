# text-diff
It is a simple [diff](https://en.wikipedia.org/wiki/Diff) tool that compares and finds differences in two texts inserted by the user.

## Test it:
* Online: [http://text-diff.s3-website.eu-north-1.amazonaws.com/?fbc...](http://text-diff.s3-website.eu-north-1.amazonaws.com/?fbclid=IwAR2wAZljf7BFIAi1NLP3fRiOn_fx4R_9vivw3lXC2ktNHPOFvXzhbam7nW0)
* Locally: Download index.html file and open it with any browser

## Properties
* Built with Html, CSS, and JavaScript
* Uses [Longest Common Subsequence](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem) algorithm to find and keep track of differences between two strings.

## Limitations
* Compares input text's sentence to sentence and therefore only accepts the same number of sentences in both inputs.
* Has a WORD, not a CHARACTER level accuracy.
* Coming from the last point, the sentence ending symbol (. ! ?) gets counted as a part of the last word.

## Screenshot
<img src="https://s3.eu-north-1.amazonaws.com/elar-saks.info/text-diff.png" />
