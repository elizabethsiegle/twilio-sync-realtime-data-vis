const express = require("express");
const router = express.Router();

const syncService = require("../syncService");

const voteCount = {
  basketball: 0,
  cricket: 0,
  football: 0
};

/* POST handle survey votes. */
router.post("/", function(req, res, next) {
  const key = Object.keys(req.body)[0];
  voteCount[key]++;

  // update data in Sync document
  syncService
    .documents("SportsPoll")
    .update({ data: voteCount })
    .then(document => console.log(document));

  res.status(200).send(voteCount);
});

module.exports = router;

/* POST handle survey votes. */
router.post("/", function(req, res, next) {
  const key = Object.keys(req.body)[0];
  voteCount[key]++;
  res.status(200).send(voteCount);
});

module.exports = router;
