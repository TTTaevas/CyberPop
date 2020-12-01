function highlightLesson() {

	// Since all those functions delete&add new nodes, they definitely shouldn't be executed at the same exact time

	const first_highlight = new Promise((resolve, reject) => {
		chevronsHighlight(document.getElementById("lesson").getElementsByTagName("p"))
		chevronsHighlight(document.getElementById("lesson").getElementsByTagName("li"))
	})
	const second_highlight = first_highlight.then(new Promise((resolve, reject) => {
		quotationsHighlight(document.getElementById("lesson").getElementsByTagName("p"))
		quotationsHighlight(document.getElementById("lesson").getElementsByTagName("li"))
	}))
}

function chevronsHighlight(p) {
	const replacementChar = "@"

	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				var node_text = p_nodes[e].data.replace(/</gi, `${replacementChar}<`).split(replacementChar)

					for (let a = 0; a < node_text.length; a++) {
						node_text[a] = node_text[a].replace(/>/gi, `>${replacementChar}`).split(replacementChar)

						for (let u = 0; u < node_text[a].length; u++) {
							if (node_text[a][u].charAt(0) == "<" && node_text[a][u].charAt(node_text[a][u].length - 1) == ">") {
								//Highlight
								var node_highlight = document.createElement("span")
								node_highlight.classList.add("highlight-chevrons")
								node_highlight.appendChild(document.createTextNode(node_text[a][u]))
								to_add.push(node_highlight)
							} else {to_add.push(document.createTextNode(node_text[a][u]))} //Don't highlight
						}

					}

			} else {to_add.push(p_nodes[e])} //Just add it directly if it doesn't have text

		}

		//Removes old paragraphs by removing the last paragraph until none remains
		for (let e = 0; e < p_nodes.length; e++) {p[i].childNodes[e].remove()}

		//Add new paragraphs by adding each paragraph at the end of the object
		for (let e = 0; e < to_add.length; e++) {p[i].appendChild(to_add[e])}
	}
}

function quotationsHighlight(p) {
	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				// First, we are using regex to extract the words that are within quotes, regardless of period endings
				/// or line breaks before or after, etc.
				//// Then, we split up each node into sections (node_text) separated at quotations marks (including the "" separators)
				/// Iterate through node_text, and check if the item we are on is in the extractedQuotes array.
				// If so, add a span and highlight class, and append to the document. Otherwise, just append it as is

				var regex = /"(.*?)"/g; // find words within quotes, including quotes
				const extractQuotes = p_nodes[e].data.match(regex) // extract the words within quotes into an array

				// Note: the above regex variable will not work properly for splitting the way we want to here
				// If regex above is used, the closing quote will be a part of the proceeding item in the array
				// Be careful if trying to consolidate to just one regex variable

				var regexForSplit = /(".*?")/ // capture groups within quotes, including quotes
				var node_text = p_nodes[e].data.split(regexForSplit) // split p_nodes[e] into array separating quoted words

				for (let a = 0; a < node_text.length; a++) { // loop through the node split up into words
					if (extractQuotes && extractQuotes.includes(node_text[a])) { // if there are any words in quotes in this group, and this word is one of them -> highlight it
						var node_highlight = document.createElement("span")
						node_highlight.classList.add("highlight-quotation")
						node_highlight.appendChild(document.createTextNode(node_text[a]))
						to_add.push(node_highlight)
					} else {
						to_add.push(document.createTextNode(node_text[a])) // if not, don't highlight
					}
				}

			} else {to_add.push(p_nodes[e])} //Just add it directly if it doesn't have text
			
		}

		//Removes old paragraphs by removing the last paragraph until none remains
		for (let e = 0; e < p_nodes.length; e++) {p[i].childNodes[e].remove()}

		//Add new paragraphs by adding each paragraph at the end of the object
		for (let e = 0; e < to_add.length; e++) {
			p[i].appendChild(to_add[e])
		}
	}
}
