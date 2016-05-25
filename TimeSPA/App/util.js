//namespace
window.timesheet = window.timesheet || {};

//util
timesheet.inputHour = function (event) {
    //allow 0-9 and period characters only
    return event.charCode >= 46 && event.charCode <= 57 && event.charCode != 47;
};

timesheet.getNextDayOfWeek = function (date, dayOfWeek) {
    // Code to check that date and dayOfWeek are valid left as an exercise ;)

    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}
