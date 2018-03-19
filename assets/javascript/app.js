$(document).ready(function () {
    friendlyCalendar();

    var currentDate = "";
    var maxDate = "";

    //Uses Moment JS to add max and min dates to calendar & make it more user friendly;
    function friendlyCalendar() {
        currentDate = moment().format("YYYY-MM-DD");
        maxDate = moment(currentDate).add(4, "days").format("YYYY-MM-DD");
        $("#startDate").attr({ "min": currentDate, "max": maxDate, "value": currentDate });
        $("#endDate").attr({ "min": currentDate, "max": maxDate, "value": currentDate });
    };





}); //ends the "document.ready" code