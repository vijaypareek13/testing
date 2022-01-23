/**
 * Rapyd Integrations: Request Signature.
 *
 * This app implements the Rapyd's API request signature. The crypto-js library
 * is required (https://www.npmjs.com/package/crypto-js). To install it, run:
 *
 * npm install crypto-js
 *
 * @link   https://docs.rapyd.net/
 * @file   This files defines the main node.js application.
 * @author Isaac Benitez.
 * @version 0.0.1
 *
 * @requires express
 * @requires https
 * @requires crypto-js
 */
require("dotenv").config();
const express = require("express");

const makeRequest = require("./utilities").makeRequest;

const app = express();
const PORT = process.env.PORT || 3000;

app.set("json spaces", 4);

app.listen(PORT);

app.get("/country", async (req, res) => {
  //we can change country code here
  try {
    const result = await makeRequest(
      "GET",
      "/v1/payment_methods/country?country=in"
    );

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.get("/payment", async (req, res) => {
  try {
    const body = {
      amount: 230,
      currency: "INR",
      payment_method: {
        type: "in_bharatpay_cash", //payment method require
      },
    };
    const result = await makeRequest("POST", "/v1/payments", body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

//testing
app.get("/checkout", async (req, res) => {
  try {
    const body = {
      amount: 200,
      complete_payment_url: "https://www.hostingerweb.com",
      country: "us",
      currency: "USD",
      error_payment_url: "https://www.google.com",
      merchant_reference_id: "12345",
      cardholder_preferred_currency: true,
      language: "en",
      metadata: {
        merchant_defined: true,
      },
      // payment_method:{
      //     type: 'us_atmdebit_card',
      //     // type: 'in_visa_debit_card',
      // },
      //payment method require
      payment_method_types_includes: ["us_atmdebit_card"],
      payment_method_types_excludes: [],
    };
    const result = await makeRequest("POST", "/v1/checkout", body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
