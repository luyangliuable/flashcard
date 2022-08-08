import logo from './logo.svg';
import './App.css';
import Card from "./component/Card";
import { useState } from "react";

function App() {

  const [cards, updateCards] = useState({
    current: 1,
    "cards": [
      {
        id: 1,
        "confidence": 0,
        "front": "What framework is the frontend?",
        "back": "react-js",
      },
    ],
  }
  );

  return (
    <div className="App" style={containerStyle.base}>
      {
        cards.cards.filter( card => card.id == 1 ).map(filteredCard => {
          return (
              <Card front={ filteredCard.front } back={ filteredCard.back }/>
          );
        })}
      <br />
      <div style={{ display: "flex", "justifyContent": "space-around" }}>
        <div className="button" style={buttonStyle}>Confident</div>
        <div className="button" style={buttonStyle}>Expected</div>
        <div className="button" style={buttonStyle}>Need Practice</div>
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
