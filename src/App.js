import './App.css';
import Card from "./component/Card";
import React, { Component, useState, useEffect } from "react";
import Button from "./component/Button";
import InputText from "./component/InputText";
import "./App.css";

import addCard from "./functions/addCard";

function App() {
    /**
     * This function represent the App component
     * @returns nothing
     */

    const updateConfidence = (confidence) => {
        /**
        * This function updates a confidence level of a flashcard.
        * @param confidence - confidence level increment
        * @returns nothing
        */

        updateCardDeck(prev => {

            ///////////////////////////////////////////////////////////////////
            //       Get the different cards to the current card shown       //
            ///////////////////////////////////////////////////////////////////
            const diff_cards = prev.cards.filter((_, idx) => idx != prev.current);

            ///////////////////////////////////////////////////////////////////
            //              Get the same card to currently shown             //
            ///////////////////////////////////////////////////////////////////
            const same_card = prev.cards.filter((_, idx) => idx == prev.current);

            ///////////////////////////////////////////////////////////////////
            //                   Update only the card shown                  //
            ///////////////////////////////////////////////////////////////////
            same_card[0].confidence += confidence;

            //////////////////////////////////////////////////////////////////////////////
            // Update the cardDeck state with the updated confidence and show next card //
            //////////////////////////////////////////////////////////////////////////////
            return {
                ...prev,
                current: (cardDeck.current + 1) % ( prev.cards.length ), // Show next card
                cards: [
                    ...prev.cards, // Confidence updated
                ]
            };
        });

        console.log(`Card ${cardDeck.current}'s confidence is ${current[0].confidence}`);

        ///////////////////////////////////////////////////////////////////////
        //                        Unflip the next card                       //
        ///////////////////////////////////////////////////////////////////////
        updateCardFlippedStatus(prev => {
            return {
                showfront: true,
                flip: false,
            };
        });

    };

    const [cardFlippedStatus, updateCardFlippedStatus] = useState(
        // This State represents if the card is flipped
        ///////////////////////////////////////////////////////////////////
        {
            showfront: true,
            flip: false,
        });

    const [cardDeck, updateCardDeck] = useState(
        // This state represents the state of all cards in deck
        ///////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////
        //              This is a placeholder value for cardDeck             //
        ///////////////////////////////////////////////////////////////////////
        ({
            current: null,
            cards: []
        })
    );

    useEffect(() => {
        fetch(process.env.API || "http://localhost:5001/api", {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.output.length === 0) {
                updateCardDeck({ current: 0, cards: [{ _id: 0, front: "Your deck have no cards", back: "" }] });
            } else {
                updateCardDeck({ current: 0, cards: data.output });
            }
        });
    }, []);

    // store the current card
    let current = cardDeck.cards.filter((_, index) => index == cardDeck.current);

    return (
        <div className="App" style={containerStyle.base}>
            <p>Total Number of cards inside deck: {cardDeck.cards.length}, current card is {cardDeck.current}, confidence is {current[0] ? current[0].confidence : ""} </p>

            {
                current.map(card => {
                    return (
                        <Card front={card.front} back={card.back} flipped={cardFlippedStatus} updateCardFlippedStatus={updateCardFlippedStatus} />
                    );
                })
            }
            <br />
            <div style={{ display: "flex", "justifyContent": "space-around" }}>

                <Button callback={updateConfidence} confidence={2}>Confident</Button>
                <Button callback={updateConfidence} confidence={1}>Expected</Button>
                <Button callback={updateConfidence} confidence={0}>Skip</Button>
                <Button callback={updateConfidence} confidence={-2}>Need Practice</Button>

            </div>

            <InputText id="front" placeholder="front" />
            <InputText id="back" placeholder="back" />
            <div className="button" style={buttonStyle} onClick={() => addCard(document)}>Add new card</div>
        </div>
    );
}

export default App;



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

const buttonStyle = {
    background: "#00BFFF",
    color: "#FFF",
    padding: "8px",
    borderRadius: 4,
    cursor: "pointer",
    marginRight: "4px",
    fontFamily: "Arial"
};
