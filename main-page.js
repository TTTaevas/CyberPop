$(document).ready(function() {
	$(".hidden").hide() //Hide elements that are supposed to be hidden in the first place

	$(".buttons button").click(function() {
		var index = $(this).index()
		var buttonsToChange = $(this).siblings()
		var presentation = $(this).parent().siblings().filter(".presentation").children()
		var hiddenElements = $(this).parent().siblings().filter(".hidden")

		if ($('html')[0].lang == "en") {$(this).html() == "^ Show more ^" ? $(this).html("v Show less v") : $(this).html("^ Show more ^")}
		if ($('html')[0].lang == "fr") {$(this).html() == "^ Montrer plus ^" ? $(this).html("v Montrer moins v") : $(this).html("^ Montrer plus ^")}
		if ($('html')[0].lang == "de") {$(this).html() == "^ Mehr ^" ? $(this).html("v Weniger v") : $(this).html("^ Mehr ^")}
		
		//CURRENT ANIMATIONS ARE SUBJECT TO CHANGE
		for (let i = 0; i < buttonsToChange.length; i++) {
			$(buttonsToChange[i]).toggle(100)
		}
		for (let i = 0; i < presentation.length; i++) {
			$(presentation[i]).toggle(300)
			if (i == index) {
				$(hiddenElements[i]).toggle(300)
			}
		}
	})
})