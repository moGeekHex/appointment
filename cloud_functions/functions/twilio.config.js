const twilio = require('twilio');

const accountSID = 'AC46e3bbe98ddb4be8460b65b535f18ed8';

const authToken = '4efe65af80e81b1b76369961bc9caf63';

module.exports = new twilio.Twilio(accountSID,authToken);