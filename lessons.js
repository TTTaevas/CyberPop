function highlightLesson() {

	// "I" REPRESENTS WHICH PARAGRAPH IN THE ARRAY THAT HAS ALL OF THEM NAMED "P"
	// "E" REPRESENTS THE CHILD NODE

	//Since all those functions delete&add new paragraphs, they definitely shouldn't be executed at the same exact time
	const first_highlight = new Promise((resolve, reject) => {chevronsHighlight()})
	const second_highlight = first_highlight.then(new Promise((resolve, reject) => {quotationsHighlight()}))
}

// Both functions below need a different way of adding back characters that died due to .split()

function chevronsHighlight() { //This function will see its code changed by tomorrow, I'm sure it can be much more logic and readable
	var p = document.getElementById("lesson").getElementsByTagName("p") //Get all paragraphs

	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>

				//// "A" REPRESENTS ONE OF TWO PARTS OF A TEXT:
				//// IF "A" CANNOT BE 1, THERE IS NO HIGHLIGHTING TO BE DONE
				//// IF "A" CAN BE 1 AND IS 0, IT REPRESENTS TEXT THAT NEEDS TO BE HIGHLIGHTED
				//// IF "A" CAN BE AND IS 1, IT REPRESENTS TEXT THAT SHOULDN'T BE HIGHLIGHTED

				var node_text = p_nodes[e].data.split("<")
				for (let a = 0; a < node_text.length; a++) {if (a != 0) {node_text[a] = "<" + node_text[a]}} //Add < back
				for (let a = 0; a < node_text.length; a++) {
					node_text[a] = node_text[a].split(">")
					
					if (node_text[a].length > 1) {
						for (let u = 0; u < node_text[a].length; u++) {if (u == 0) {node_text[a][u] += ">"}} //Add > back
						var node_highlight = document.createElement("span")
						node_highlight.classList.add("highlight")
						node_highlight.appendChild(document.createTextNode(node_text[a][0]))
						to_add.push(node_highlight)
						node_text[a] = node_text[a][1]
					}

					to_add.push(document.createTextNode(node_text[a]))
					
				}

			} else {to_add.push(p_nodes[e])} //Just add it directly if it doesn't have text
			
		}

		//Removes old paragraphs by removing the last paragraph until none remains
		for (let e = 0; e < p_nodes.length; e++) {p[i].childNodes[e].remove()}

		//Add new paragraphs by adding each paragraph at the end of the object
		for (let e = 0; e < to_add.length; e++) {p[i].appendChild(to_add[e])}
	}
}

function quotationsHighlight() {
	var p = document.getElementById("lesson").getElementsByTagName("p") //Get all paragraphs
	for (let i = 0; i < p.length; i++) {
		var p_nodes = p[i].childNodes
		var to_add = []

		for (let e = 0; e < p_nodes.length; e++) {

			if (p_nodes[e].nodeType == 3) { //If the node has text, if not a <br>
				var node_text = p_nodes[e].data.split('"')
				if (node_text.length == 1) { //There is no highlighting needed there
					to_add.push(document.createTextNode(node_text[0]))
				} else { //There is highlighting needed there
					for (let a = 0; a < node_text.length; a++) {

						if (a % 2 != 0) { //Since the character at start&end of highlight is similar, highlight is at odd index
							//HOWEVER, THIS ACTUALLY CAUSES A BUG IN FR JS LESSON 1 & EN JS LESSON 2, F ME
							node_text[a] = '"' + node_text[a] + '"' //Add " and " back, theoritically
							var node_highlight = document.createElement("span")
							node_highlight.classList.add("highlight-quotation")
							node_highlight.appendChild(document.createTextNode(node_text[a]))
							to_add.push(node_highlight)
						} else {to_add.push(document.createTextNode(node_text[a]))}

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
