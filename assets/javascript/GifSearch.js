// @ts-ignore
//It's not working correctly and I cannot figure out why!!!

$(document).ready(function () {
	var animals = ["cat", "dog", "monkey", "panda", "otter", "elephant", "polar bear", "chinchilla", "parrot", "shark", "dolphin", "stingray", "octopus"];
	//This is where we call the API, have the search paramater  (using 'q') embedded and set a limit
	function displayGifs() {
		$("#allGifs").empty();
		var animal = $(this).val();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=n1uDkuTgcCzTvtLwBMmGNfnAE88WHZHT&limit=10";
		// @ts-ignore
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			// @ts-ignore
			$("#gif-holder").empty();
			var gifResults = response.data;

			for (var i = 0; i < gifResults.length; i++) {
				// @ts-ignore
				var gifDiv = $("<div>")
				gifDiv.attr("class", "gif");
				// adds the rating to the GIfs
				var ratingElement = $("<p>").text("Rating: " + gifResults[i].rating);
				// Populates the area with Gifs and holds them still
				var gifImage = $("<img>");
				gifImage.attr({
					src: gifResults[i].images.fixed_height_still.url,
					"data-state": "still",
					"data-still": gifResults[i].images.fixed_height_still.url,
					"data-animate": gifResults[i].images.fixed_height.url,
					class: "gif"
				});
				gifDiv.append(ratingElement, gifImage);

				// @ts-ignore
				$("#allGifs").append(gifDiv);

			}

		});
	}
	function getButtons() {
		//Creates a button for all the elements in array
		$("#allButtons").empty();
		for (var i = 0; i < animals.length; i++) {
			$('#allButtons').append("<input type='button' class='animal-button' value='" + animals[i] + "'/>");
		}
	}
	// this is where the animation on the gifs happens.
	$("body").on("click", ".gif", function () {
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	// This is  where I am trying to add a new button but it is not working!
	$("#button-input").on("click", function (event) {
		event.preventDefault();
		var newAni = $('#button-input').val().trim();

		// @ts-ignore
		newAni.push(allButtons);

		getButtons();
	});

	// @ts-ignore
	$(document).on("click", ".animal-button", displayGifs);

	getButtons();

});