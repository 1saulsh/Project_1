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

    controller();
    
    //Controles program logic
    function controller() {
        submit();
        friendlyCalendar();
    }

    //User input verification for date format
    function validateDate(txtDate) {
       
    }

    function submit() {
        console.log("Inside submit");
        document.getElementById("submit").addEventListener("click", storeDates);
    }
    
    //Stores user input dates
    function storeDates(event) {
         console.log("Inside storeDates");
        event.preventDefault();
        startDate = document.getElementById("startDate").value;
        endDate = document.getElementById("endDate").value;
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

    }

}); //ends the "document.ready" code
