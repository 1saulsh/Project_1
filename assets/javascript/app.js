$(document).ready(function () {
    // The controller function calls the functions in the desired order
    controller();
    mapsRequest();



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
        locationButtons();
        // weatherRequest()
        validateEmail();
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

    // Functionality when locations are selected
    function locationButtons() {
        // Adding a click event listener to all elements with a class of "locationBtn"
        $(document).on("click", ".locationBtn", setLocationInfo);
        function setLocationInfo() {
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


        // for current weather
        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                // console.log(weatherURL);
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

                currentWeather = "<tr><td><strong>" + prettyName + "</strong><img src ='" + currentIcon + "' alt ='Weather Icon'><br> Currently: " + currentTemp + "&#8457 <br> Wind: " + currentWind + " mph <br>" + currentDescription + "</td>";
                console.log('currentWeather HTML =' + currentWeather);

                // Adding the currentWeather to the table
                $("#weatherWidget").html(currentWeather);

            });


        // for forecasted weather
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

                // Transfer content to HTML
                // $("#temperature").html(response.main.temp);
                // $("#pressure").html(response.main.pressure);
                // $("#humidity").html(response.main.humidity);

            });
        // $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    }
  
    
     //Pin locations to map as they are selected by use
    function mapsRequest() {
        /*TODO
        have our map page grab onto the maps id in html so it will show up
        */
        var APIKey = "AIzaSyBXewlGo5brD8HlCh3P8fdqOErBY57gVto";
       
        var queryURL = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&callback=mapsRequest";

        // will hold our coords// order of coords list aspen, boulder, breckenridge, denver, dillon, durango, estes, golden, grandjunction, pueblo, steamboat, vail
        var markers = [{lat: 40.01500, lng: -105.27050}, {lat: 39.48170, lng: -106.03840}, {lat: 39.7392, lng: -104.9903}, {lat: 39.7392, lng: -104.9903 }, {lat: 39.63030, lng: -106.04340 }, {lat: 37.27530, lng: -107.88010 }, {lat: 40.37720, lng: -105.52170}, {lat: 39.75550, lng: -105.22110}, {lat: 39.06390, lng: -108.55060}, {lat: 38.2544, lng: -104.6091}, {lat: 40.48500, lng: -106.83170}, {lat: 39.64030, lng: -106.37420}];
       
        //Map options        
       
        //New Map
        var options = {
            zoom: 8,
            center: {lat: 39.5501, lng: -105.7821}
        }

        var map = new google.maps.Map($('#map'), options);
        

        var cities = _.object(['Aspen'], ['Boulder'], ['Breckenridge'], ['Dillon'], ['Durnago'], ['Estes Park'], ['Golden'], ['Grand Junction'], ['Pueblo'], ['Steamboat'], ['Vail']);
    
         
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
        
        
        //Loop through markers and for each iteration add marker 1

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
    map();
    console.log(map);
    console.log(mapsRequest);
    console.log(addMarker);

});  


    // Push location specific weather data to weatherWidgets
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
            console.log('?? =' + regex.test(email));
        }
    }

    //Stores user email
    function storeEmail() {

    }

//ends the "document.ready" code
