$(document).ready(function() {

	//Load the menu
	$("#menu_content").hide()
	$("#menu_toggle").click(function() {
		$("#menu_content").toggle(200)
	})
	$("#menu_content").click(function() {
		$("#menu_content").toggle(200)
	})

})

function changeButtons() {

	var title = document.title //Title represents current lesson
	var prevButton = $("#prev-lesson")
	var nextButton = $("#next-lesson")
	var lists = $("#menu_content").find("li") 
	lists.each(function(i) {
		if ($(this).text() == title) {
			$(this).css("backgroundColor", "rgb(180, 105, 255)") //Highlight in the menu the current lesson
			//vv Index is used because prev()/next() do not work inter-sub-categories vv
			if (prevButton.length) {
				prevButton.text("<- " + $(lists[i-1]).text())
				prevButton.attr("href", $(lists[i-1]).find("a").attr("href"))
			}
			if (nextButton.length) {
				nextButton.text($(lists[i+1]).text() + " ->")
				nextButton.attr("href", $(lists[i+1]).find("a").attr("href"))
			}
		}
	})

}
