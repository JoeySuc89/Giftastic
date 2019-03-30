var people = ["Michael Jackson", "Matt Damon", "Louis Anderson", "John Goodman"];

function getImages() {

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Oa3z9BlvYCPPu6yv7HhQGtqRI6boTyaI&limit=10&q=" + $(this).text()


  $.ajax({
    url: queryURL,
    method: "GET",
  })

  .then(function(response){
    $("#disply_scr").empty();
    var results = response.data;
    console.log(response.data)
    for (var i = 0; i < results.length; i++) {

      var ratings = results[i].rating;
      ratingTag = $("<p>").text("Rating: " + ratings);
      personDiv = $("<div>");

      // build animated image
      newImg = $("<img>");
      newImg.attr("src", results[i].images.downsized_still.url);
      newImg.attr("data-state", "animate");
      newImg.attr("still", results[i].images.downsized_still.url);
      newImg.attr("animate", results[i].images.downsized_medium.url);
      newImg.addClass("gif-image")

      personDiv.append(ratingTag);
      personDiv.prepend(newImg);
      $("#disply_scr").prepend(personDiv);
    }
  })
}

function makeButtons() {

  $("#gif-btn").empty();

  for (var i = 0; i < people.length; i++){

    var newBtn = $("<button>");
    newBtn.addClass("gif-btn");
    newBtn.attr("data", people[i]);
    newBtn.text(people[i]);
    $("#gif-btn").prepend(newBtn);

  }
}

$("#add-people").on("click", function(event) {
  event.preventDefault();
  var newPeople = $("#people-input").val().trim();
  people.push(newPeople);
  makeButtons();
})




$(document).on("click", ".gif-btn", getImages);
$(document).on("click", ".gif-image", imageAnimate);
makeButtons();

function imageAnimate() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("still"));
    $(this).attr("data-state", "still");
  }
};
