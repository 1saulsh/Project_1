$(document).ready(function () {
    // The controller function calls the functions in the desired order
    controller();



    //Variables Declaration 
    var startDate, endDate, currentDate, maxDate, coldWeather, warmWeather, userEmail,// options, map, marker, infoWindow;

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


    //Location suggestion 1 identified by a marker
    /*addMarker = "";

    //Location suggestion 2
    addMarker = "";

    //Location suggestion 3
    addMarker = "";

*/
    //Functions Declaration

    //Controles program logic
    function controller() {
        filterOptions();
        weatherRequest()
    }

    //User input verification for date format
    function validateDate(txtDate) {
        //var regex = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/
        //return regex.test(date);

        var currVal = txtDate;
        if (currVal == '')
            return false;

        var rxDatePattern = "/^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/";
        var dtArray = currVal.match(rxDatePattern);
        if (dtArray == null)
            return false;

        dtMonth = dtArray[1];
        dtDay = dtArray[3];
        dtYear = dtArray[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    }

    //Stores user input dates
    function storeDates() {

    }

    //Uses Moment JS to add max and min dates to calendar & make it more user friendly;
    function friendlyCalendar() {
        currentDate = moment().format("YYYY-MM-DD");
        maxDate = moment(currentDate).add(4, "days").format("YYYY-MM-DD");
        $("#startDate").attr({ "min": currentDate, "value": currentDate });
        $("#endDate").attr({ "min": currentDate, "value": currentDate });
    };

    //Populates activity options based on user input
    function filterOptions() {
        var filterChoice = "";

        $("#warmOrCold").change(function () {
            filterChoice = $(this).val();

            //warm is 1 and cold is 2
            if (filterChoice === "1") {
                $("#coldActivities").hide();
                $("#warmActivities").show();
            } else if (filterChoice === "2") {
                $("#warmActivities").hide();
                $("#coldActivities").show();
            } else {
                $("#coldActivities").hide();
                $("#warmActivities").hide();
            }
        });
    }



//Bring back weather API
function weatherRequest() {
    var APIKey = "f14d227760b4a41dd4df09b8f308252e";
    var queryLocation = "Denver, US";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryLocation + "&appid=f14d227760b4a41dd4df09b8f308252e";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // Log the queryURL
            console.log("queryURL= " + queryURL);
            // Log the resulting object
            console.log(response);
            // Transfer content to HTML
            $("#city").html(response.city.name);
            $("#main_weather").html(response.weather[0].main);
            $("#description_weather").html(response.weather[0].description);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            $("#temperature").html(response.main.temp);
            $("#pressure").html(response.main.pressure);
            $("#humidity").html(response.main.humidity);

            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });
}


//Bring back map API
function mapRequest() {

}

//Creates location/marker suggestions
function suggestLocations() {

}
//Populates location suggestions
function outputLocations() {

}

//Expands location suggestions
function expandSuggestion() {
    fvalid

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

}

}); //ends the "document.ready" code
