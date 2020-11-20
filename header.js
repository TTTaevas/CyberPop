function languageSwitch() {
	var url = window.location.href.split("/")
	$(".lang-select").children().each(function() {
		if ($(this).text() == "English") {url[3] = "en"}
		if ($(this).text() == "Français") {url[3] = "fr"}
		if ($(this).text() == "Deutsche") {url[3] = "de"}
		
		$(this).attr("href", url.join("/"))
	})
}
