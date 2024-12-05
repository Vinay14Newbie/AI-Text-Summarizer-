// This is the function where the call to the API is made. Returns the summarized text as a string.

const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function summarizeText(text) {
  let data = JSON.stringify({
    // The JSON.stringify() step is actually not necessary because Axios stringifies JSON for you when you pass it a regular object, but we’ll use it anyway since Postman gave it to us
    inputs: text,
    parameters: {
      max_length: 100,
      min_length: 30,
    },
  });

  // A config object that will contain the instructions for the API call

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
    data: data,
  };

  // Capture the request in a try/catch to check for any errors that may occur

  try {
    const response = await axios.request(config);
    return response.data[0].summary_text;
  } catch (error) {
    console.log(error);
  }
}

// Allows for summarizeText() to be called outside of this file

module.exports = summarizeText;
