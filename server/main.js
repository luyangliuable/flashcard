const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    });
});


app.listen(5001, () => {console.log("server started");});

