const express = require("express");
const router = express.Router();
const ratesData = require("../data/exchange_rates_inr_to_other_currencies.json");

// GET /api/v1/ratesininr/:date/:currency
router.get("/:date/:currency", (req, res) => {
  const { date, currency } = req.params;

  // Validate the request
  if (!date || !currency) {
    return res
      .status(400)
      .json({ error: "Invalid date or currency parameter." });
  }

  // Check if the date exists in the data
  const dateData = ratesData[date];
  if (!dateData) {
    return res
      .status(404)
      .json({ error: `No exchange rate data available for this: ${date}` });
  }

  // Check if the currency exists for the date
  const currencyRate = dateData[currency];
  if (!currencyRate) {
    return res.status(404).json({
      error: `No exchange rate data available for currency: ${currency} on ${date}`,
    });
  }

  // Respond with the rate
  return res.json({
    date: date,
    currency: currency,
    rate: currencyRate,
  });
});

module.exports = router;
