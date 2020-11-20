function executeJS() {

	paragraphs = document.getElementsByTagName('p')

	for (let i = 0; i < paragraphs.length; i++) {
		new_size = (Math.round(Math.random() * (70 - 4) + 4)).toString() + "px"
		console.log("New font-size for paragraph " + (i + 1).toString() + ": " + new_size)
		paragraphs[i].style.fontSize = new_size
	}

}
