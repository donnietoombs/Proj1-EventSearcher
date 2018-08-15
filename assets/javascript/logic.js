// Performing GET requests to the OMDB API and logging the responses to the console


$("#searchTeamBtn").on("click", function(event) {
  event.preventDefault();

$("#testDiv").empty();


// Grabs user input
var trainName = $("#teamNameInput").val().trim();
var testName = $("#teamNameInput").val($(this).val().toLowerCase().replace(" ", "-"));
trainName.toLowerCase();
var lowStr= trainName.toLowerCase();
var formattedText =lowStr.replace(/ /g,"-");
console.log(formattedText);

var teamName = "washington-redskins";
var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + formattedText + "&client_id=MTI2OTM3NTd8MTUzNDIxNzA0OS45Mg&client_secret=5a186662f95a2be9b6b3a7e0de031a42b656c00e20c4c969c867cdb40bee6811";

$.ajax({
  url: queryURL,
 method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.events);
  console.log(response.events[0]);
  

  for (i =0; i<response.events.length; i++ ) {
  var respEvent = response.events[i].short_title;
  console.log(respEvent);

    //   var newDivs = $("<p class='games'>");
    //    $(".games").text(testShow);
  
     $("#testDiv").append("<ul>" + respEvent + "</ul>");
  }

});

var queryURL2 = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + formattedText;

// Perfoming an AJAX GET request to our queryURL
$.ajax({
  url: queryURL2,
  method: "GET"
})

// After the data from the AJAX request comes back
  .then(function(response) {
    console.log(response);

  // Saving the image_original_url property
    var imageUrl = response.data.image_original_url;

    // Creating and storing an image tag
    var teamImage = $("<img>");

    // Setting the teamImage src attribute to imageUrl
    teamImage.attr("src", imageUrl);
    teamImage.attr("alt", "cat image");

    // Prepending the teamImage to the images div
    $("#teamImage").html(teamImage);
  });






















/*var queryURL2="https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=washingtonredskins";
// "https://api.giphy.com/v1/gifs/search?q=" + trainName + "&api_key=Y5629Z6gX2pYj8IIsreLeaMMm5ZOjUvi";

$.ajax({
  url: queryURL2,
 method: "GET"
}).then(function(response) {
  
  console.log(response);
  var imageUrl = response.data[0].image_original_url;

  // Creating and storing an image tag
  var teamImage = $("<img>");

  // Setting the teamImage src attribute to imageUrl
  teamImage.attr("src", imageUrl);
  teamImage.attr("alt", "team image");

  // Prepending the teamImage to the images div
  $("#teamImage").append(teamImage);
});*/

});



