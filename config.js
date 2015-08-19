var secret = {
  "WARCRAFT_LOGS_API_KEY": "yomamasophat",
  "BNET_API_KEY": "yomamasophat"
};

try {
  secret = require('./secret');
}
catch (exception) {
  if (exception.code === "MODULE_NOT_FOUND") {
    console.log('Could not load SECRET keys!');
  }
}


// environment variables take priority, for production
if (process.env.WARCRAFT_LOGS_API_KEY) {
  secret.WARCRAFT_LOGS_API_KEY = process.env.WARCRAFT_LOGS_API_KEY;
  console.log('Using env[WARCRAFT_LOGS_API_KEY]');
}

if (process.env.BNET_API_KEY) {
  secret.BNET_API_KEY = process.env.BNET_API_KEY;
  console.log('Using env[BNET_API_KEY]');
}

module.exports = secret;
