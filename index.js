const express = require("express");
const app = express();
const port = 3000;
const summariseText = require("./summarize.js");

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static("public"));

// Handle POST requests to the '/summarize' endpoint
app.post("/summarize", (req, res) => {
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // call your summarizeText function, passing in the text from the request
  summariseText(text)
    .then((response) => {
      console.log("Text summarised succefully :)");

      return res.send(response);
    })
    .catch((error) => {
      console.log(error.message);
      return res.send(error);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
