const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51HfswlLZH504GxAlxPz3jkHu7zMt5MeVmCfJmrFVo6wCFR0GZaPsjPMi6AIvDVaxdaH1DTL6ACsazS2kZYpOFUpI00hTaG5Bqs"
);

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5000" }));
app.use(express.json());

app.post("/checkout", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Server on port", 5000);
});
