function initMap() {

    //Map options
    var options = {
        zoom: 8,
        center: { lat: 39.5501, lng: -105.7821 }
    }

    //New Map
    var map = new google.maps.Map(document.getElementById("map"), options);


    /*
    //Add marker
    var marker = new google.maps.Marker({
        position: {lat:39.7392, lng:-104.9903},
        map:map
        });
    var infoWindow = new google.maps.InfoWindow({
        content:"<h1>Denver, CO</h1>"
        });
    
    marker.addListener("click", function(){
        infoWindow.open(map, marker);
        });
    */

    //Array of Markers
    var markers = [
        {
            coords: { lat: 39.19110, lng: -106.81750 },
            content: "<h1>Aspen, CO</h1> <a href='https://www.aspenchamber.org/' target='_blank'>More about Aspen</a>'"
        },
        {
            coords: { lat: 40.01500, lng: -105.27050 },
            content: "<h1>Boulder, CO</h1> <a href='https://www.bouldercoloradousa.com/' target='_blank'>More about Boulder</a>'"
        },
        {
            coords: { lat: 39.48170, lng: -106.03840 },
            content: "<h1>Breckenridge, CO</h1> <a href='https://www.gobreck.com/' target='_blank'>More about Breckenridge</a>'"
        },
        {
            coords: { lat: 39.7392, lng: -104.9903 },
            content: "<h1>Denver, CO</h1> <a href='https://denverchamber.org/' target='_blank'>More about Denver</a>'"
        },
        {
            coords: { lat: 39.63030, lng: -106.04340 },
            content: "<h1>Dillon, CO</h1> <a href='http://www.townofdillon.com/' target='_blank'>More about Dillon</a>'"
        },
        {
            coords: { lat: 37.27530, lng: -107.88010 },
            content: "<h1>Durango, CO</h1> <a href='https://www.durango.org/' target='_blank'>More about Durango</a>'"
        },
        {
            coords: { lat: 40.37720, lng: -105.52170 },
            content: "<h1>Estes Park, CO</h1> <a href='https://www.visitestespark.com/' target='_blank'>More about Estes Park</a>'"
        },
        {
            coords: { lat: 39.75550, lng: -105.22110 },
            content: "<h1>Golden, CO</h1> <a href='https://www.visitgolden.com/' target='_blank'>More about Golden</a>'"
        },
        {
            coords: { lat: 39.06390, lng: -108.55060 },
            content: "<h1>Grand Junction, CO</h1> <a href='https://www.visitgrandjunction.com/' target='_blank'>More about Grand Junction</a>'"
        },
        {
            coords: { lat: 38.2544, lng: -104.6091 },
            content: "<h1>Pueblo, CO</h1> <a href='http://pueblo.org/visit-pueblo' target='_blank'>More about Pueblo</a>'"
        },
        {
            coords: { lat: 40.48500, lng: -106.83170 },
            content: "<h1>Steamboat, CO</h1> <a href='https://www.steamboatchamber.com/' target='_blank'>More about Steamboat</a>'"
        },
        {
            coords: { lat: 39.64030, lng: -106.37420 },
            content: "<h1>Vail, CO</h1> <a href='https://www.visitvailvalley.com/' target='_blank'>More about Vail</a>'"
        }
    ];

    //Loop through markers and for each iteration add marker 
    for (var i = 0; i < markers.length; i++) {

        //Add Marker
        addMarker(markers[i]);

    }

    //Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener("click", function () {
                infoWindow.open(map, marker);
            });
        }
    }
}

$(document).ready(function () {
    // The controller function calls the functions in the desired order
    controller();



    //Variables Declaration 
    var startDate, endDate, currentDate, maxDate, coldWeather, warmWeather, userEmail, cityName, queryLocation, identifier, lon, lat, mapCoordinates, marker;
    // options, map, marker, infoWindow;

    // Selected City -determined BY and returned FROM the API
    cityName = "";

    // Used to assign an id name to each row    
    identifier = ""

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

    //longitude
    lon = "";

    // latitude
    lat = "";

    // latitude and longitude together
    mapCoordinates = "";

    //formats map marker
    marker = "";

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
        // validateEmail()
    }




    // <<<<<<<<<<This is an idea for the future >>>>>>>>>>>
    // This function handles events where a city button is clicked
    // $("#add-city").on("click", function (event) {
    //     event.preventDefault();
    //     // This line grabs the input from the textbox
    //     var city = $("#city-input").val().trim();
    // });


    // Functionality when locations are selected
    function locationButtons() {

        var locations = [];
        // Adding an event listener to all checkboxes with a class of "locationBtn"
        $(":checkbox").change(function () {
            queryLocation = $(this).val();
            identifier = $(this).attr("data-idName");
          
            if (this.checked) {
                showAndHide()
                weatherRequest(queryLocation);
                scrollToWeather();

            } else {
                $("#" + identifier).empty();
            };
        })
    }

    // This will hide and show the appropriate things when a location is selected
    function showAndHide() {
        $("#selectMessage").hide();
        $("#clearAll").show();
        $("#weatherDisplay").show();
    }

    function scrollToWeather() {
        $('html, body').animate({
            scrollTop: $("#hotspots").offset().top
        }, 2000);
    }


    //Bring back weather API
    function weatherRequest(location) {
        var APIKey = "f14d227760b4a41dd4df09b8f308252e";
        // console.log('queryLocation =' + queryLocation);
        var currentWeather = "";
        var forecastWeather = "";

        // Current Weather Data URL
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + APIKey;

        // Future Forecast URL
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=" + APIKey;

        // WeatherWidget Variables
        // These come from the weatherURL
        var currentTemp, currentWind, currentDescription, currentIcon;
        // These come from the forcastURL
        var timestamp24, timestamp48, timestamp72, timestamp96, timestamp120, icon24, icon48, icon72, icon96, icon120, high24, high48, high72, high96, high120, low24, low48, low72, low96, low120, description24, description48, description72, description96, description120;


        firstWeather();

        // Creates a new row to store location based weather
        // var weatherRow = $("<tr>");
        var weatherRow = $("<tr id='" + identifier + "'>");

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
                    currentTemp = response.main.temp;
                    currentWind = response.wind.speed;
                    currentDescription = response.weather[0].description;
                    currentIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
                    lon = response.coord.lon;
                    lat = response.coord.lat;

                    //creating the table data for the currentWeather
                    currentWeather = "<td><strong>" + prettyName + "</strong><img src ='" + currentIcon + "' alt ='Weather Icon'><br> Currently: " + currentTemp + "&#8457 <br> Wind: " + currentWind + " mph <br>" + currentDescription + "</td>";
                    // console.log(currentWeather);

                    // Adding the currentWeather to the Table Row
                    weatherRow.append(currentWeather);
                    secondWeather();

                    mapCoordinates = "{ lat: " + lat + ", lng: " + lon + " }"

                    
                    //format for marker
                    // marker = "coords: " + mapCoordinates + ",content: '<h1>" + cityName + "</h1>'}"
                    marker = "coords: " + mapCoordinates;
                    console.log('marker =' + marker)
                    console.log(markers);
                    
                    markers.push(marker);
                    console.log("something2");

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

                    timestamp24 = moment.unix(response.list[8].dt).format("MMM DD");
                    timestamp48 = moment.unix(response.list[16].dt).format("MMM DD");
                    timestamp72 = moment.unix(response.list[24].dt).format("MMM DD");
                    timestamp96 = moment.unix(response.list[32].dt).format("MMM DD");
                    timestamp120 = moment.unix(response.list[response.list.length - 1].dt).format("MMM DD");

                    icon24 = "http://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png"
                    icon48 = "http://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png"
                    icon72 = "http://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png"
                    icon96 = "http://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png"
                    icon120 = "http://openweathermap.org/img/w/" + response.list[response.list.length - 1].weather[0].icon + ".png"
                    high24 = response.list[8].main.temp_max;
                    high48 = response.list[16].main.temp_max;
                    high72 = response.list[24].main.temp_max;
                    high96 = response.list[32].main.temp_max;
                    high120 = response.list[response.list.length - 1].main.temp_max;
                    low24 = response.list[8].main.temp_min;
                    low48 = response.list[16].main.temp_min;
                    low72 = response.list[24].main.temp_min;
                    low96 = response.list[32].main.temp_min;
                    low120 = response.list[response.list.length - 1].main.temp_min;
                    description24 = response.list[8].weather[0].description;
                    description48 = response.list[16].weather[0].description;
                    description72 = response.list[24].weather[0].description;
                    description96 = response.list[32].weather[0].description;
                    description120 = response.list[response.list.length - 1].weather[0].description;


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

    // function to reset weather (& map?)
    $("#clearAll").on("click", function (clearAll) {
        clearAll.preventDefault();
        $("#weatherWidget").empty();
        $("#selectMessage").show();
        $(":checkbox").prop('checked', false);
    });


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
    // function validateEmail() {
    //     function isEmail(email) {
    //         var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //         return regex.test(email);
    //         console.log('?? =' + regex.test(email));
    //     }
    // }

    //Stores user email
    function storeEmail() {

    }

    //Initializes Firebase
    var config = {
        apiKey: "AIzaSyDArV6eE1B4jA-wTGWT0sKUmbSobhgd78U",
        authDomain: "project-1-b6d47.firebaseapp.com",
        databaseURL: "https://project-1-b6d47.firebaseio.com",
        projectId: "project-1-b6d47",
        storageBucket: "project-1-b6d47.appspot.com",
        messagingSenderId: "137075171849"
    };
    firebase.initializeApp(config);


    var database = firebase.database();
    // Initial Values
    var email = "";
    // Capture Button Click
    $("#signup-button").on("click", function() {
        // Don't refresh the page
        event.preventDefault();
        // Store and retrieve email submission
        email = $("#email-input").val().trim();
        // Push email data to Firebase
        database.ref().push(email); 
        // Log user email input
        console.log(email);
        // Clears the text-box
        $("#email-input").val("");
        // Prints Success Message
        $("#signup-success").text("Thanks for signing up!");
        
      });
}); //ends the "document.ready" code
