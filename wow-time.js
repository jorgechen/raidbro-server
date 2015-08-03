// These are specific to World of Warcraft

var WowTime = {};

WowTime.RESET_DAY = 2; // Tuesday

// Reset times in each region:
WowTime.RESET_HOUR_UTC = {
  "us": 16, // 9AM PDT, 11AM CST
  "eu": 8 // 9AM London
}
// TODO eu at London is not verified, might be later Paris/Moscow

// exact Date of the next reset day
WowTime.currentResetDate = function (region) {

  var hour = 0;

  switch (region) {
    case 'eu':
      hour = WowTime.RESET_HOUR_UTC.eu;
      break;
    //TODO kr, cn, tw
    default:
      hour = WowTime.RESET_HOUR_UTC.us;
  }

  var date = new Date();
  var currentDay = date.getDay();

  var dayDelta = WowTime.RESET_DAY - currentDay;

  if (dayDelta > 0) {
    dayDelta -= 7;
  }

  date.setDate(date.getDate() + dayDelta);
  date.setUTCHours(hour, 0, 0, 0);

  return date;
}

WowTime.previousResetDate = function (region, weeks) {
  weeks = weeks || 0;

  var date = WowTime.currentResetDate(region);
  date.setDate(date.getDate() - 7 * weeks);
  return date;
}

// @return timestamp of given days before now
WowTime.timestampDaysBefore = function (days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date.getTime();
}




module.exports = WowTime;
