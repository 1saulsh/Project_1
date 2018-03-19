//Uses Moment JS to add max and min dates to calendar
//This just makes the date input fields and drop-down calendar more user friendly; 
//Not input-validation because the user could still type in a min and max that doesn't meet the criteria... We need an if statement that checks that the date is valid.
var currentDate = moment().format("YYYY-MM-DD");
var maxDate = moment(currentDate).add(4, "days").format("YYYY-MM-DD");
console.log("MAX DATE: " + maxDate);

// Changing the max and min attributes of the start and end date
$("#startDate").attr({ "min": currentDate, "max": maxDate });
$("#endDate").attr({ "min": currentDate, "max": maxDate });