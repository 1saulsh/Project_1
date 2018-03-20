$(document).ready(function () {
    // The controller function calls the functions in the desired order
    controller();

    //Variables Declaration
    var startDate, endDate, currentDate, maxDate, coldWeather, warmWeather, userEmail, city1, city2, city3;

    //Start date of desired stacation
    startDate = "";

    //End date of desired stacation
    endDate = "";

    // Current date (today)
    currentDate = "";

    // The last possible date the user can select
    maxDate = "";

    //Cold weather activity type
    coldWeather = "";

    //Warm weather activity type
    warmWeather = "";

    //User email
    userEmail = "";

    //Location suggestion 1
    city1 = "";

    //Location suggestion 2
    city2 = "";

    //Location suggestion 3
    city3 = "";

    
    //Functions Declaration
    
    //Controles program logic
    function controller() {
        bindSubmit();
        friendlyCalendar();
    }

    //User input verification for date format
    function validateDate() {
        jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $( "#myform" ).validate({
          rules: {
            startDate: {
              required: true,
              date: true
            }
          }
        });
    }

    function bindSubmit() {
        console.log("Inside submit");
        $("#submit").on("click", storeDates);
    }
    
    //Stores user input dates
    function storeDates(event) {
        event.preventDefault();
        console.log("Inside storeDates");
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
        console.log(startDate);
        console.log(endDate);
    }

    //Uses Moment JS to add max and min dates to calendar & make it more user friendly;
    function friendlyCalendar() {
        currentDate = moment().format("YYYY-MM-DD");
        maxDate = moment(currentDate).add(4, "days").format("YYYY-MM-DD");
        $("#startDate").attr({ "min": currentDate, "max": maxDate, "value": currentDate });
        $("#endDate").attr({ "min": currentDate, "max": maxDate, "value": currentDate });
    };


    //Populates activity options based on user input
    function filterOptions() {

   }

    //Bring back weather API
    function weatherRequest() {
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var queryLocation = "Minneapolis,US";
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +queryLocation+ "&appid=" + APIKey;

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);
            // Transfer content to HTML
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature (F) " + response.main.temp);
            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
          });
    }

    //Bring back map API
    function mapRequest() {

    }

    //Creates location suggestions
    function suggestLocations() {

    }

    //Populates location suggestions
    function outputLocations() {

    }

    //Expands location suggestions
    function expandSuggestion() {

    }

    //User input verification for email format
    function validateEmail() {
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
    }

    //Stores user email
    function storeEmail() {
        userEmail = $("#email").val();

         var config = {
           apiKey: "AIzaSyDArV6eE1B4jA-wTGWT0sKUmbSobhgd78U",
           authDomain: "project-1-b6d47.firebaseapp.com",
           databaseURL: "https://project-1-b6d47.firebaseio.com",
           projectId: "project-1-b6d47",
           storageBucket: "",
           messagingSenderId: "137075171849"
         };

        firebase.initializeApp(config);

        var database = firebase.database();

        $("#emailSubmit").on("click", function() {
          database.ref().set({
            userEmail: userEmail
          });
        });
    }
});