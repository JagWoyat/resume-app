export function sliceWords(inputString, numberOfWords) {
	var wordsArray = inputString.split(" ");
	var slicedWords = wordsArray.slice(0, numberOfWords);
	var resultString = slicedWords.join(" ");

	return resultString;
}
