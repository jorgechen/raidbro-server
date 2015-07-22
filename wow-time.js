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
WowTime.nextResetDate = function (region) {

  var hour = WowTime.RESET_HOUR_UTC.us;

  switch (region) {
    case 'eu':
      hour = WowTime.RESET_HOUR_UTC.eu;
      break;
    //TODO kr, cn, tw
  }

  var date = new Date();
  var currentDay = date.getDay();

  var dayDelta = WowTime.RESET_DAY - currentDay;

  if (WowTime.RESET_DAY < currentDay) {
    dayDelta += 7;
  }

  console.log('dayDelta ' + dayDelta);

  date.setDate(date.getDate() + dayDelta);
  date.setUTCHours(hour, 0, 0, 0);

  return date;
}

module.exports = WowTime;
