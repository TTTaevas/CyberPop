function highlightLesson() {

	// Since all those functions delete & add new nodes, they definitely shouldn't be executed at the same exact time
	/// First variable is an array of all fitting elements of the HTML document, such as "p" and "li"
	/// Second variable, called "x", is the first character of any highlighted text
	/// Third variable, called "y", is the last character of any highlighted text

	const first_highlight = new Promise((resolve, reject) => {
		highlight(document.getElementById("lesson").getElementsByTagName("p"), "<", ">")
		highlight(document.getElementById("lesson").getElementsByTagName("li"), "<", ">")
	})
	const second_highlight = first_highlight.then(new Promise((resolve, reject) => {
		highlight(document.getElementById("lesson").getElementsByTagName("p"), '"', '"')
		highlight(document.getElementById("lesson").getElementsByTagName("li"), '"', '"')
	}))
}

function highlight(p, x, y) {
	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				// First, we are using regex to extract the words that are within x and y, regardless of period endings
				/// or line breaks before or after, etc.
				//// Then, we split up each node into sections (node_text) separated at the x and y marks (including the separators)
				/// Iterate through node_text, and check if the item we are on is in the extractWords array.
				// If so, add a span and highlight class, and append to the document. Otherwise, just append it as is

				var regex = new RegExp(`${x}(.*?)${y}`, "g") // find words within x and y, including x and y
				const extractWords = p_nodes[e].data.match(regex) // extract the words within x and y into an array

				// Note: the above regex variable will not work properly for splitting the way we want to here
				// If regex above is used, the closing quote will be a part of the proceeding item in the array
				// Be careful if trying to consolidate to just one regex variable

				var regexForSplit = new RegExp(`(${x}.*?${y})`) // capture groups within x and y, including x and y
				var node_text = p_nodes[e].data.split(regexForSplit) // split p_nodes[e] into array separating quoted words

				for (let a = 0; a < node_text.length; a++) { // loop through the node split up into words
					if (extractWords && extractWords.includes(node_text[a])) { // if there are any words within x and y in this group, and this word is one of them -> highlight it
						var node_highlight = document.createElement("span")

						if (x == '<') {node_highlight.classList.add("highlight-chevrons")}
						if (x == '"') {node_highlight.classList.add("highlight-quotation")}

						node_highlight.appendChild(document.createTextNode(node_text[a]))
						to_add.push(node_highlight)
					} else {
						to_add.push(document.createTextNode(node_text[a])) // if not, don't highlight
					}
				}

			} else {to_add.push(p_nodes[e])} // Just add it directly if it doesn't have text
			
		}

		// Removes old paragraphs by removing the last paragraph until none remains
		for (let e = 0; e < p_nodes.length; e++) {p[i].childNodes[e].remove()}

		// Add new paragraphs by adding each paragraph at the end of the object
		for (let e = 0; e < to_add.length; e++) {
			p[i].appendChild(to_add[e])
		}
	}
}
