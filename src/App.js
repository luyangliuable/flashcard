import logo from './logo.svg';
import './App.css';
import Card from "./component/Card";
import { useState, useEffect } from "react";

function App() {

  const addCard = () => {
    const front = document.getElementById("front").value;
    const back = document.getElementById("back").value;
    fetch("http://localhost:5001/api/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {front: front, back: back, confidence: 0} ),
      // 'Content-Type': 'application/json',
    }).then(response => {
      return response.json();
    }).then(res => {
      console.log(res);
    });
  };

  const updateConfidence = (confidence) => {
    updateCardDeck(prev => {
      const same_cards = prev.cards.filter(( fcard, idx ) => idx != prev.current);
      const diff_cards = prev.cards.filter(( fcard, idx ) => idx == prev.current);
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

  const [cardDeck, updateCardDeck] = useState(
    {
      current: 1,
      cards: [
        {
          id: 1,
          front: "",
          back: "",
        }
      ]
    }
  );

  useEffect(() => {
    // Fetch data
    fetch("http://localhost:5001/api", {
      method: 'GET',
      // body: { content: file, name: file.path },
    }).then(response => response.json()).then(data => {
      console.log(data.output);
      console.log(data.output);
      console.log(data.output);
      console.log(data.output);
      console.log(data.output.length);
      if (data.output.length === 0) {
        updateCardDeck({ current: 0, cards: [ { _id: 0, front: "Your deck have no cards", back: "" } ] });
      } else {
        updateCardDeck({current:0, cards: data.output});
      }
    });
  }, []);

  // store the current card
  let current = cardDeck.cards.filter(( card, index ) => index == cardDeck.current);

  return (
    <div className="App" style={containerStyle.base}>
      <p>Total Number of cards inside deck: {cardDeck.cards.length}</p>
      <p>Currently showing card: {JSON.stringify(current[0])}</p>
      {
        current.map(card => {
          return (
            <Card front={card.front} back={card.back} />
          );
        })}
      <br />
      <div style={{ display: "flex", "justifyContent": "space-around" }}>

        <div className="button" style={buttonStyle} onClick={() => updateConfidence(2)}>Confident</div>
        <div className="button" style={buttonStyle} onClick={() => updateConfidence(1)}>Expected</div>
        <div className="button" style={buttonStyle} onClick={() => updateConfidence(0)}>Skip</div>
        <div className="button" style={buttonStyle} onClick={() => updateConfidence(-2)}>Need Practice</div>
      </div>

      <textarea id="front" placeholder="front"></textarea>
      <textarea id="back" placeholder="back"></textarea>
      <div className="button" style={buttonStyle} onClick={() => addCard()}>Add new card</div>
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
