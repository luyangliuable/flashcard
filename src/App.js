import logo from './logo.svg';
import './App.css';
import Card from "./component/Card";
import { useState, useEffect } from "react";

function App() {

  const updateConfidence = (confidence) => {
    updateCardDeck(prev => {
      const same_cards = prev.cards.filter(fcard => fcard.id != prev.current);
      const diff_cards = prev.cards.filter(fcard => fcard.id == prev.current);
      diff_cards[0].confidence += confidence;
      return {
        ...prev,
        current: (prev.current + 1) % prev.cards.length,
        cards: [
          ...same_cards,
          ...diff_cards,
        ]
      };
    });
  };

  const [cardDeck, updateCardDeck] = useState({
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

  useEffect(() => {
    console.log(cardDeck);
  }, [cardDeck]);

  // store the current card
  let current = cardDeck.cards.filter(card => card.id == cardDeck.current);

  return (
    <div className="App" style={containerStyle.base}>
      <p>Total Number of cards inside deck: {cardDeck.cards.length}</p>
      <p>Currently showing card: {JSON.stringify(current[0])}</p>
      {
        current.map(filteredCard => {
          return (
            <Card front={filteredCard.front} back={filteredCard.back} />
          );
        })}
      <br />
      <div style={{ display: "flex", "justifyContent": "space-around" }}>

        <div className="button" style={buttonStyle} onClick={() => updateConfidence(2)}>Confident</div>
      <div className="button" style={buttonStyle} onClick={() => updateConfidence(1)}>Expected</div>
        <div className="button" style={buttonStyle} onClick={() => updateConfidence(0)}>Skip</div>
        <div className="button" style={buttonStyle} onClick={() => updateConfidence(-2)}>Need Practice</div>
      </div>
    </div>
  );
}

export default App;

const buttonStyle = {
  background: "#00BFFF",
  color: "#FFF",
  padding: "8px",
  borderRadius: 4,
  cursor: "pointer",
  marginRight: "4px",
  fontFamily: "Arial"
};


const containerStyle = {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFF",
    position: "absolute",
    top: 0,
    height: "100%",
    left: 0,
    width: "100%",
    boxShadow: "2px 2px 2px #888",
    flexDirection: "column"
  },
};
