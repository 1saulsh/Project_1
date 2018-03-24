$(document).ready(function () {
    // The controller function calls the functions in the desired order
    controller();



    //Variables Declaration 
    var startDate, endDate, currentDate, maxDate, coldWeather, warmWeather, userEmail, cityName, queryLocation;
    // options, map, marker, infoWindow;

    // Selected City -determined BY and returned FROM the API
    cityName = "";

    // This comes -determend FOR and sent TO the API
    queryLocation = "";

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
        locationButtons()
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

    // Functionality when locations are selected
    // function locationButtons() {
    //     // Adding an event listener to all checkboxes with a class of "locationBtn"
    //     $(":checkbox").change(function () {
    //         if (this.checked) {
    //             function setLocationInfo() {
    //                 $("#selectMessage").hide();
    //                 queryLocation = $(this).val();
    //                 weatherRequest();
    //             }
    //         } else if (this.unchecked) {
    //             alert("unchecked");
    //             //remove the location from weather
    //         }

    // Functionality when locations are selected
    function locationButtons() {
        // Adding a click event listener to all elements with a class of "locationBtn"
        $(document).on("click", ".locationBtn", setLocationInfo);
        function setLocationInfo() {
            $("#selectMessage").hide();
            queryLocation = $(this).val();
            weatherRequest();
        };
    };



    //Bring back weather API
    function weatherRequest() {
        var APIKey = "f14d227760b4a41dd4df09b8f308252e";
        // console.log('queryLocation =' + queryLocation);
        var currentWeather = "";
        var forecastWeather = "";

        // Current Weather Data URL
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryLocation + "&units=imperial&appid=" + APIKey;

        // Future Forecast URL
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryLocation + "&units=imperial&appid=" + APIKey;

        // WeatherWidget Variables
        // These come from the weatherURL
        var currentTemp, currentWind, currentDescription, currentIcon;
        // These come from the forcastURL
        var timestamp24, timestamp48, timestamp72, timestamp96, timestamp120, icon24, icon48, icon72, icon96, icon120, high24, high48, high72, high96, high120, low24, low48, low72, low96, low120, description24, description48, description72, description96, description120;



        firstWeather();

        // Creates a new row to store location based weather
        var weatherRow = $("<tr>");
        console.log('weatherRow =' + weatherRow);

        // Adding the currentWeather to the table
        $("#weatherWidget").append(weatherRow);

        // for current weather
        function firstWeather() {
            $.ajax({
                url: weatherURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(weatherURL);
                    // console.log(response);
                    cityName = response.name;
                    prettyName = cityName.toUpperCase();
                    // console.log('cityName =' + cityName);
                    currentTemp = response.main.temp;
                    // console.log('currentTemp =' + currentTemp);
                    currentWind = response.wind.speed;
                    // console.log('currentWind =' + currentWind);
                    currentDescription = response.weather[0].description;
                    // console.log('currentDescription =' + currentDescription);
                    currentIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
                    // console.log(currentIcon);

                    currentWeather = "<td><strong>" + prettyName + "</strong><img src ='" + currentIcon + "' alt ='Weather Icon'><br> Currently: " + currentTemp + "&#8457 <br> Wind: " + currentWind + " mph <br>" + currentDescription + "</td>";
                    // console.log(currentWeather);

                    // Adding the currentWeather to the Table Row
                    weatherRow.append(currentWeather);
                    secondWeather();

                });
        }
        // for forecasted weather
        function secondWeather() {
            $.ajax({
                url: forecastURL,
                method: "GET"
            })
                .then(function (response) {
                    // console.log("forecastURL= " + forecastURL);
                    timestamp24 = moment.unix(response.list[8].dt).format("MMM DD");
                    // console.log('timestamp24 =' + timestamp24);
                    timestamp48 = moment.unix(response.list[16].dt).format("MMM DD");
                    // console.log('timestamp48 =' + timestamp48);
                    timestamp72 = moment.unix(response.list[24].dt).format("MMM DD");
                    // console.log('timestamp72 =' + timestamp72);
                    timestamp96 = moment.unix(response.list[32].dt).format("MMM DD");
                    // console.log('timestamp96 =' + timestamp96);
                    timestamp120 = moment.unix(response.list[response.list.length - 1].dt).format("MMM DD");
                    // console.log('timestamp120 =' + timestamp120);

                    icon24 = "http://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png"
                    // console.log(icon24);
                    icon48 = "http://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png"
                    // console.log(icon48);
                    icon72 = "http://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png"
                    // console.log(icon72);
                    icon96 = "http://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png"
                    // console.log(icon96);
                    icon120 = "http://openweathermap.org/img/w/" + response.list[response.list.length - 1].weather[0].icon + ".png"
                    // console.log(icon120);
                    high24 = response.list[8].main.temp_max;
                    // console.log(high24);
                    high48 = response.list[16].main.temp_max;
                    // console.log(high48);
                    high72 = response.list[24].main.temp_max;
                    // console.log(high72);
                    high96 = response.list[32].main.temp_max;
                    // console.log(high96);
                    high120 = response.list[response.list.length - 1].main.temp_max;
                    // console.log(high120);
                    low24 = response.list[8].main.temp_min;
                    // console.log(low24);
                    low48 = response.list[16].main.temp_min;
                    // console.log(low48);
                    low72 = response.list[24].main.temp_min;
                    // console.log(low72);
                    low96 = response.list[32].main.temp_min;
                    // console.log(low96);
                    low120 = response.list[response.list.length - 1].main.temp_min;
                    // console.log(low120);
                    description24 = response.list[8].weather[0].description;
                    // console.log(description24);
                    description48 = response.list[16].weather[0].description;
                    // console.log(description48);
                    description72 = response.list[24].weather[0].description;
                    // console.log(description72);
                    description96 = response.list[32].weather[0].description;
                    // console.log(description96);
                    description120 = response.list[response.list.length - 1].weather[0].description;
                    // console.log(description120);

                    forecastWeather24 = "<td><strong>" + timestamp24 + "</strong><img src ='" + icon24 + "' alt ='Weather Icon'><br> High: " + high24 + "&#8457 <br> Low: " + low24 + "&#8457 <br>" + description24 + "</td>";

                    forecastWeather48 = "<td><strong>" + timestamp48 + "</strong><img src ='" + icon48 + "' alt ='Weather Icon'><br> High: " + high48 + "&#8457 <br> Low: " + low48 + "&#8457 <br>" + description48 + "</td>";

                    forecastWeather72 = "<td><strong>" + timestamp72 + "</strong><img src ='" + icon72 + "' alt ='Weather Icon'><br> High: " + high72 + "&#8457 <br> Low: " + low72 + "&#8457 <br>" + description72 + "</td>";

                    forecastWeather96 = "<td><strong>" + timestamp96 + "</strong><img src ='" + icon96 + "' alt ='Weather Icon'><br> High: " + high96 + "&#8457 <br> Low: " + low96 + "&#8457 <br>" + description96 + "</td>";

                    forecastWeather120 = "<td><strong>" + timestamp120 + "</strong><img src ='" + icon120 + "' alt ='Weather Icon'><br> High: " + high120 + "&#8457 <br> Low: " + low120 + "&#8457 <br>" + description120 + "</td></tr>";

                    forecastWeather = forecastWeather24.concat(forecastWeather48, forecastWeather72, forecastWeather96, forecastWeather120);

                    // Adding the forecastWeather to the Table Row
                    weatherRow.append(forecastWeather);
                });
        }
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