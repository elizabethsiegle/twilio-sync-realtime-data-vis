const express = require("express");
const router = express.Router();

const Twilio = require("twilio");
const syncService = require("../syncService");
const AccessToken = Twilio.jwt.AccessToken;
const SyncGrant = AccessToken.SyncGrant;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const syncServiceSid = process.env.TWILIO_SYNC_SERVICE_SID || "default";

// create a document resource, providing it a Sync service resource SID
syncService.documents
  .create({
    uniqueName: "Stock3Poll",
    data: {
      buy: 0,
      sell: 0,
      hold: 0
    }
  })
  .then(document => console.log(document));

/* GET home page. */
router.get("/", function(req, res, next) {
  // Generate access token
  const token = new AccessToken(accountSid, apiKey, apiSecret);

  // create a random string and use as token identity
  let randomString = [...Array(10)]
    .map(_ => ((Math.random() * 36) | 0).toString(36))
    .join("");
  token.identity = randomString;

  // Point token to a particular Sync service.
  const syncGrant = new SyncGrant({
    serviceSid: syncServiceSid
  });
  token.addGrant(syncGrant);

  res.render("index", { title: "Stock3 Poll", token: token.toJwt() });
});

module.exports = router;
