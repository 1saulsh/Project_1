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
        weatherRequest()
        validateEmail()
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
        var queryLocation = "denver";

        // Current Weather Data URL
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryLocation + "&units=imperial&appid=" + APIKey;

        // Future Forecast URL
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryLocation + "&units=imperial&appid=" + APIKey;

        // WeatherWidget Variables
        var cityName = "";
        var currentTemp = "";
        var currentWind = "";
        var currentDescription = "";
        var currentIcon = "";
        var icon30 = "";
        var icon60 = "";
        var icon90 = "";
        var icon120 = "";
        var high30 = "";
        var high60 = "";
        var high90 = "";
        var high120 = "";
        var low30 = "";
        var low60 = "";
        var low90 = "";
        var low120 = "";
        var description30 = "";
        var description60 = "";
        var description90 = "";
        var description120 = "";

        // for current weather
        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(weatherURL);
                console.log(response);
                cityName = response.name;
                console.log('cityName =' + cityName);
                currentTemp = response.main.temp;
                console.log('currentTemp =' + currentTemp);
                currentWind = response.wind.speed;
                console.log('currentWind =' + currentWind);
                currentDescription = response.weather[0].description;
                console.log('currentDescription =' + currentDescription);
                currentIcon = response.weather[0].icon;
                console.log('currentIcon =' + currentIcon);
            });


        // for forecasted weather
        $.ajax({
            url: forecastURL,
            method: "GET"
        })
            .then(function (response) {
                // Log the forecastURL
                console.log("forecastURL= " + forecastURL);
                icon30 = "";
                icon60 = "";
                icon90 = "";
                icon120 = "";
                high30 = "";
                high60 = "";
                high90 = "";
                high120 = "";
                low30 = "";
                low60 = "";
                low90 = "";
                low120 = "";
                description30 = "";
                description60 = "";
                description90 = "";
                description120 = "";
                

                    // Transfer content to HTML


                    $("#temperature").html(response.main.temp);
                $("#pressure").html(response.main.pressure);
                $("#humidity").html(response.main.humidity);

                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                console.log("Temperature (F): " + response.main.temp);
            });
        // $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    }

    // Push location specific weather data to weatherWidgets
    function outputLocations() {

    }

    //Pin locations to map as they are selected by user
    function mapRequest() {

    }

    //Expands location suggestions
    function expandSuggestion() {

    }

    //User input verification for email format
    function validateEmail() {
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
            console.log('?? =' + regex.test(email));
        }
    }

    //Stores user email
    function storeEmail() {

    }

}); //ends the "document.ready" code
