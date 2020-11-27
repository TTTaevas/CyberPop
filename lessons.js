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
								node_highlight.classList.add("highlight")
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
	const replacementChar = "¤"

	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				// ABOUT THE WHOLE .REPLACE.SPLIT:
				/// To know if the quotation mark marks the beginning or the end of a 'quote',
				/// It looks if there's a space before then after that quotation mark.
				/// However, not all 'quotes' have a space before them, but they all have a character that isn't from the alphabet.
				//// It would be very easy to replace the blank space by some REGEXP on the replace field,
				//// But it would basically destroy whatever character matched the REGEXP.
				/// Therefore, replacements would need to be made case-by-case, saving the matching character into a variable,
				/// Then using that variable in the replacement process. Replacement wouldn't be global anymore.

				var node_text = p_nodes[e].data.replace(/ "/gi, ` ${replacementChar}"`).split(replacementChar)
				
				for (let a = 0; a < node_text.length; a++) {
					node_text[a] = node_text[a].replace(/" /gi, `"${replacementChar} `).split(replacementChar)

					for (let u = 0; u < node_text[a].length; u++) {
						if (node_text[a][u].charAt(0) == '"' && node_text[a][u].charAt(node_text[a][u].length - 1) == '"') {
							//Highlight
							var node_highlight = document.createElement("span")
							node_highlight.classList.add("highlight-quotation")
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
