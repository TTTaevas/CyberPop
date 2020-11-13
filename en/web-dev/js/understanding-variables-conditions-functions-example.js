function makeBigger(num) {
	var size = document.getElementById("alpha").style.fontSize
	document.getElementById("alpha").style.fontSize = (Number(size.replace('px', '')) + num).toString() + 'px'
}

function changeColor() {
	var r = Math.floor(Math.random() * 255)
	var g = Math.floor(Math.random() * 255)
	var b = Math.floor(Math.random() * 255)
	console.log(`Red ${r} | Green ${g} | Blue ${b}`)
	document.getElementById("alpha").style.color = `rgb(${r}, ${g}, ${b})`
}

function changeBG() {
	if (document.getElementById("alpha").style.backgroundColor == "red") {
		document.getElementById("alpha").style.backgroundColor = "blue"
	} else {
		var colors = ["red", "yellow", "green", "blue", "purple", "pink", "white", "black"]
		var i = Math.floor(Math.random() * colors.length)
		if (colors[i] == document.getElementById("alpha").style.backgroundColor) {console.log("Same background color!! " + colors[i])}
		document.getElementById("alpha").style.backgroundColor = colors[i]
	}
}

function changeDisplay() {
	var alpha = document.getElementById("alpha")
	alpha.style.display == "inline" ? alpha.style.display = "none" : alpha.style.display = "inline"
}
