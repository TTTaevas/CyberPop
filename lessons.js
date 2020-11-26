function highlightLesson() {

	// Since all those functions delete&add new paragraphs, they definitely shouldn't be executed at the same exact time

	const first_highlight = new Promise((resolve, reject) => {chevronsHighlight()})
	//vv this is commented as it is slightly too buggy to my liking atm vv
	//const second_highlight = first_highlight.then(new Promise((resolve, reject) => {quotationsHighlight()}))
}

function chevronsHighlight() {
	const replacementChar = "@"
	var p = document.getElementById("lesson").getElementsByTagName("p") //Get all paragraphs

	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				var node_text = p_nodes[e].data.replace(/</gi, `${replacementChar}<`).split(replacementChar)

				if (node_text.length > 1) { //If highlighting is needed in the first place
				
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

				} else {to_add.push(document.createTextNode(node_text[0]))} //If not highlighting needed in first place, just add

			} else {to_add.push(p_nodes[e])} //Just add it directly if it doesn't have text
			
		}

		//Removes old paragraphs by removing the last paragraph until none remains
		for (let e = 0; e < p_nodes.length; e++) {p[i].childNodes[e].remove()}

		//Add new paragraphs by adding each paragraph at the end of the object
		for (let e = 0; e < to_add.length; e++) {p[i].appendChild(to_add[e])}
	}
}

function quotationsHighlight() { // THIS FUNCTION WILL BE WORKEN ON IN A FUTURE COMMIT
	const replacementChar = "¤"
	var p = document.getElementById("lesson").getElementsByTagName("p") //Get all paragraphs

	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				var node_text = p_nodes[e].data.replace(/ "/gi, ' ¤"').split(replacementChar)
				
				for (let a = 0; a < node_text.length; a++) {
					node_text[a] = node_text[a].replace(/" /gi, '"¤ ').split(replacementChar)
					if (node_text[a].length > 1) {
						var node_highlight = document.createElement("span")
						node_highlight.classList.add("highlight-quotation")
						node_highlight.appendChild(document.createTextNode(node_text[a][0]))
						to_add.push(node_highlight)
						node_text[a] = node_text[a][1] // For adding non-highlight text
					}

					to_add.push(document.createTextNode(node_text[a])) //Add non-highlight text
					
				}

			} else {to_add.push(p_nodes[e])} //Just add it directly if it doesn't have text
			
		}
		
		//Removes old paragraphs by removing the last paragraph until none remains
		for (let e = 0; e < p_nodes.length; e++) {p[i].childNodes[e].remove()}

		//Add new paragraphs by adding each paragraph at the end of the object
		for (let e = 0; e < to_add.length; e++) {p[i].appendChild(to_add[e])}
	}
}
