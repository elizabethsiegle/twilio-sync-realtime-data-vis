const Twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const syncServiceSid = process.env.TWILIO_SYNC_SERVICE_SID || "default";

const client = new Twilio(accountSid, authToken);

// create a Sync service
const service = client.sync.services(syncServiceSid);

module.exports = service;