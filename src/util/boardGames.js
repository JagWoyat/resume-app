export function sliceWords(inputString, numberOfWords) {
	var wordsArray = inputString.split(" ");
	var slicedWords = wordsArray.slice(0, numberOfWords);
	var resultString = slicedWords.join(" ");

	return resultString;
}

export async function fetchData(
	apiUrl,
	apiTarget = "BoardGames",
	orderTarget = "",
	orderBy = "none",
	page = 1,
	pageSize = 25
) {
	let URL = apiUrl + `/${apiTarget}?`;
	if (page > 1) {
		URL = URL + `$skip=${(page - 1) * pageSize}&`;
	}
	if (orderTarget !== "" && orderBy !== "none") {
		if (orderBy === "default") {
			URL = URL + `orderby=${orderTarget}`;
		} else if (orderBy === "desc") {
			URL = URL + `orderby=${orderTarget} desc`;
		}
	}
	const res = await fetch(URL);
	if (!res.ok) {
		return;
	}
	const bgs = await res.json();
	return bgs;
}

export async function fetchSearch(
	apiUrl,
	searchParam,
	apiTarget = "BoardGames",
	orderTarget = "",
	orderBy = "none",
	page = 1,
	pageSize = 25
) {
	let URL = apiUrl + `/${apiTarget}/Filter:${searchParam}?`;
	if (page > 1) {
		URL = URL + `$skip=${(page - 1) * pageSize}&`;
	}
	if (orderTarget !== "" && orderBy !== "none") {
		if (orderBy === "default") {
			URL = URL + `$orderby=${orderTarget}`;
		} else if (orderBy === "desc") {
			URL = URL + `$orderby=${orderTarget} desc`;
		}
	} else {
		URL = URL + `$orderby=FilterValue&`;
	}
	const res = await fetch(URL);
	if (!res.ok) {
		return;
	}
	const bgs = await res.json();
	return bgs;
}

// async function fetch() {
// 	let URL = API_URL + "/BoardGames?";
// 	if (page > 1) {
// 		URL = URL + `$skip=${(page - 1) * PAGE_SIZE}&`;
// 	}
// 	if (orderTarget !== "" && orderBy !== "none") {
// 		if (orderBy === "default") {
// 			URL = URL + `orderby=${orderTarget}`;
// 		} else if (orderBy === "desc") {
// 			URL = URL + `orderby=${orderTarget} desc`;
// 		}
// 	}
// 	const res = await fetch(URL);
// 	if (!res.ok) {
// 		return;
// 	}
// 	const bgs = await res.json();
// 	setBoardGames(bgs);
// }
// async function fetchS() {
// 	let URL = API_URL + "/BoardGames" + `/Filter:${searchParam}?`;
// 	if (page > 1) {
// 		URL = URL + `$skip=${(page - 1) * PAGE_SIZE}&`;
// 	}
// 	if (orderTarget !== "" && orderBy !== "none") {
// 		if (orderBy === "default") {
// 			URL = URL + `$orderby=${orderTarget}`;
// 		} else if (orderBy === "desc") {
// 			URL = URL + `$orderby=${orderTarget} desc`;
// 		}
// 	} else {
// 		URL = URL + `$orderby=FilterValue&`;
// 	}
// 	const res = await fetch(URL);
// 	if (!res.ok) {
// 		return;
// 	}
// 	const bgs = await res.json();
// 	setBoardGames(bgs);
// 	setLoading(false);
// }
