var people = ["Michael Jackson", "Matt Damon", "Louis Anderson", "John Goodman"];

function getImages() {

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Oa3z9BlvYCPPu6yv7HhQGtqRI6boTyaI&limit=10&q=" + $(this).text()


  $.ajax({
    url: queryURL,
    method: "GET",
  })

  .then(function(response){

    var results = response.data;
    console.log(response.data)
    for (var i = 0; i < results.length; i++) {

      var ratings = results[i].rating;
      ratingTag = $("<p>").text("Rating: " + ratings);
      personDiv = $("<div>");
      newImg = $("<img>");
      newImg.attr("src", results[i].images.original_still.url);
      personDiv.append(ratingTag);
      personDiv.append(newImg);
      $("#gif-btn").prepend(personDiv);
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
makeButtons();
