const express = require("express");
var router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51HfswlLZH504GxAlxPz3jkHu7zMt5MeVmCfJmrFVo6wCFR0GZaPsjPMi6AIvDVaxdaH1DTL6ACsazS2kZYpOFUpI00hTaG5Bqs"
);

router.post("/checkout", async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      payment_method: id,
      confirm: true
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

module.exports = router;
