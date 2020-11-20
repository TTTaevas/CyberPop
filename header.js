function languageSwitch(selection) {
	var val = selection.options[selection.selectedIndex].value;
	var url = window.location.href.split("/");
	url[3] = val;
	url = url.join("/")
	window.location.replace(url)
}