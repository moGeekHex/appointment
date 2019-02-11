const twilio = require('twilio');

const accountSID = 'your ID';

const authToken = 'Youre token in twilio ';

module.exports = new twilio.Twilio(accountSID,authToken);
