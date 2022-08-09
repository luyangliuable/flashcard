const express = require('express');
const mongoose = require('mongoose');
const flashcard = require('./models/flashcard');
const { createCard, getCards } = require("./controllers/card_controller");
const app = express();

///////////////////////////////////////////////////////////////////////////////
//                             Connect to mongodb                            //
///////////////////////////////////////////////////////////////////////////////
const PORT = 27017;
const URL = "mongodb://host.docker.internal:27017/";
// const URL = "mongodb://localhost:27017/";

mongoose.connect(URL).then(
  () => {
    app.listen(PORT, () => {
      console.log("The server is running 🔥 ...");
    });
  }
).catch(
  err => {
    console.log(err);
  }
);


///////////////////////////////////////////////////////////////////////////////
//                                Bypass CORS                                //
///////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

///////////////////////////////////////////////////////////////////////////////
//                                Send request                               //
///////////////////////////////////////////////////////////////////////////////

// app.get("/api", (req, res) => {
//   // res.json();
//   console.log(res.body);
//   return res;
// });


app.get("/api", getCards);

app.post("/api/add", createCard);


app.listen(5001, () => { console.log("server started"); });

