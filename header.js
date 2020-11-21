function languageSwitch() {
	var url = window.location.href.split("/")
	var i = url[2].includes("github.io") ? 4 : 3
	$(".lang-select").children().each(function() {
		if ($(this).text() == "English") {url[i] = "en"}
		if ($(this).text() == "Français") {url[i] = "fr"}
		if ($(this).text() == "Deutsche") {url[i] = "de"}
		
		$(this).attr("href", url.join("/"))
	})
}
