const express = require("express");
const router = express.Router();

const syncService = require("../syncService");

const voteCount = {
  hold: 0,
  sell: 0
};

/* POST handle survey votes. */
router.post("/", function(req, res, next) {
  const key = Object.keys(req.body)[0];
  voteCount[key]++;

  // update data in Sync document
  syncService
    .documents("StocksPoll")
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
