// Performing GET requests to the OMDB API and logging the responses to the console
  // Initialize Firebase
        // This is the code we copied and pasted from our app page
        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyDBRcohSTqrqYwlY-FYyp2v5rYLpA2SQf4",
          authDomain: "eventsearcherproj1.firebaseapp.com",
          databaseURL: "https://eventsearcherproj1.firebaseio.com",
          projectId: "eventsearcherproj1",
          storageBucket: "eventsearcherproj1.appspot.com",
          messagingSenderId: "478596741259"
        };
        firebase.initializeApp(config);

 // Get a reference to the database service
 var database = firebase.database();

 var teamName2="";

// Capture Button Click
$("#searchTeamBtn").on("click", function(event) {
  // Don't refresh the page!
  event.preventDefault();

  // console.log(teamNameInput.value.split(' ').length()); 
  // < 2)

  var teamName2 = $("#teamNameInput").val().trim().toUpperCase();

  database.ref().set({
   teamName: teamName2,
  });


  $("#gameDiv").empty();
  $("#dt-tmDiv").empty();
  $("#locationDiv").empty();
  $("#memBox").empty();
 

  // Grabs user input
  var teamName = $("#teamNameInput").val().trim();

  var lowStr = teamName.toLowerCase();
  var formattedText = lowStr.replace(/ /g, "-");
  console.log(formattedText);
  searchedTeams= teamName.toUpperCase();
  console.log(searchedTeams);


var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + formattedText + "&client_id=MTI2OTM3NTd8MTUzNDIxNzA0OS45Mg&client_secret=5a186662f95a2be9b6b3a7e0de031a42b656c00e20c4c969c867cdb40bee6811&per_page=19";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.events);
    console.log(response.events[0]);
    $("#informBox").text("Click Link Below to go to SeatGeek to Buy Tix to Game!");
    for (i = 0; i < response.events.length; i++) {
      var respEvent = response.events[i].short_title;
      console.log(respEvent);

      var gameLink = $("<a>");
      gameLink.attr("href", response.events[i].url);
      gameLink.attr("title", response.events[i].short_title);
      gameLink.text(response.events[i].short_title);
      gameLink.addClass("gameLink");
      console.log(gameLink);
      $("#gameDiv").append(gameLink);

      var dttmLink = $("<p>");
      dttmLink.text(response.events[i].datetime_local);
      dttmLink.addClass("dttmLink");
      console.log(dttmLink);
      $("#dt-tmDiv").append(dttmLink);

      var locationLink = $("<p>");
      locationLink.text(response.events[i].venue.name);
      locationLink.addClass("locationLink");
      console.log(locationLink);
      $("#locationDiv").append(locationLink);
    }
  });

  var queryURL2 = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + formattedText;

  $.ajax({
    url: queryURL2,
    method: "GET",
    dataType: 'jsonp'
  }).then(function (response) {
    console.log(response);

    // Saving the image_original_url property
    var imageUrl = response.data.image_original_url;

    // Creating and storing an image tag
    var teamImage = $("<img>");

    // Setting the teamImage src attribute to imageUrl
    teamImage.attr("src", imageUrl);
    teamImage.attr("alt", "team image");
    teamImage.addClass("teamImage")

    // Prepending the teamImage to the images div
    $("#teamImage").html(teamImage);
  });


  var queryURL5 = "https://svcs.ebay.com/services/search/FindingService/v1?SERVICE-NAME=FindingService&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=DonnieTo-ProFootb-PRD-3262b1842-e568d10e&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID=EBAY-US&keywords=" + formattedText + "&paginationInput.entriesPerPage=25&paginationInput.pageNumber=1"

  $.ajax({
    url: queryURL5,
    method: "GET",
    dataType: 'jsonp',
  }).then(function (response) {
    console.log(response);
    console.log(response.findItemsByKeywordsResponse);

    for (var j = 0; j < response.findItemsByKeywordsResponse[0].searchResult[0].item.length; j++) {

      var memImageURL = response.findItemsByKeywordsResponse[0].searchResult[0].item[j].galleryURL;
      console.log(memImageURL);

      // Creating and storing an image tag
      var memImage = $("<img>");
      var itemHLink = response.findItemsByKeywordsResponse[0].searchResult[0].item[j].viewItemURL;

      // Setting the teamImage src attribute to imageUrl
      memImage.attr("src", memImageURL);
      memImage.wrap($("<a>").attr("href", itemHLink));
      memImage.attr("alt", "Memorabilia Image");
      memImage.addClass("picLink");
      memImage.wrap($("<a>").attr("href", itemHLink));

      var listingLink = $("<a>");
      listingLink.attr("href", itemHLink);
      listingLink.text(response.findItemsByKeywordsResponse[0].searchResult[0].item[j].title);
      listingLink.addClass("listingLink");

      var priceLink =$("<p>");
      priceLink.text("$" + response.findItemsByKeywordsResponse[0].searchResult[0].item[j].sellingStatus[0].convertedCurrentPrice[0].__value__);
      priceLink.addClass("priceLink");
      
      // Appending the teamImage and link to ebay to the images div
      $("#memBox").append(memImage).append(listingLink).append(priceLink);
    }
  });
});

database.ref().on("value", function(snapshot) {

  // Change the HTML to reflect
  $("#ltsBox").text(snapshot.val().teamName);


  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});




