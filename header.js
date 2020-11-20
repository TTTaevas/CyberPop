function languageSwitch(selection) {
	var val = selection.options[selection.selectedIndex].value;
	if (val == "english" || val == "francais" || val == "deutsche") {
		if (val == "english") {lang = "en"}
		if (val == "francais") {lang = "fr"}
		if (val == "deutsche") {lang = "de"}
		var url = window.location.href.split("/");
		url[3] = lang;
		url = url.join("/")
		window.location.replace(url)
	} else {console.log("Invalid value given!")}
}