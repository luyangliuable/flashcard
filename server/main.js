const express = require('express');
const mongoose = require('mongoose');
const flashcard = require('./models/flashcard');
const { createCard } = require("./controllers/card_controller");
const app = express();

///////////////////////////////////////////////////////////////////////////////
//                             Connect to mongodb                            //
///////////////////////////////////////////////////////////////////////////////
const PORT = 27017;

mongoose.connect("mongodb://localhost:27017/").then(
  () => {
    app.listen(PORT, () => {
      console.log("The server is running 🔥 ...");
      console.log(`http://localhost:${PORT}/`);
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

///////////////////////////////////////////////////////////////////////////////
//                                Send request                               //
///////////////////////////////////////////////////////////////////////////////

app.get("/api", (req, res) => {
  res.json({
      current: 1,
      cards: [
        {
          id: 0,
          confidence: 0,
          front: "What framework is the frontend?",
          back: "react-js",
        },

        {
          id: 1,
          confidence: 0,
          front: "How to filter a card?",
          back: "cards.cards.filter( card => card.id == 1 ).map(filteredCard => { \
          return( \
              <Card front = { filteredCard.front } back = { filteredCard.back } /> \
          ); \
      })"
        }
      ],
    }
  );
});



app.post("/api", createCard);


app.listen(5001, () => {console.log("server started");});

