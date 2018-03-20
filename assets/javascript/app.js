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
        friendlyCalendar();
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

    //Creates location/marker suggestions
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
