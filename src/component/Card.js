import React from 'react';
import { Component } from 'react';

import "./style.css";

export default class Card extends Component {
    /**
    * This Class represents the Card (flashcard) component
    * @prop updateCardFlippedStatus - function for updating the flipped status of the card.
    * @prop flipped - the state passed in as prop to show if the card is flipped or not.
    * @returns nothing
    */

    constructor(props) {
        super(props);

        this.state = {
            showfront: true,
            flip: false,
        };
    }


    flip() {
        ///////////////////////////////////////////////////////////////////////
        //       Toggle show front of the card and start flip animation      //
        ///////////////////////////////////////////////////////////////////////
        this.props.updateCardFlippedStatus(prev => {
            return {
                showfront: !this.props.flipped.showfront,
                flip: true, // Basically this is used to start flip animation.
            };
        });

        ////////////////////////////////////////////////////////////////////////
        // After the animnation completes in 200ms stop the animation action  //
        ////////////////////////////////////////////////////////////////////////
        setTimeout(() => {
            // Javascript anonymous function;
            this.props.updateCardFlippedStatus(prev => {
                return { ...prev, flip: false };
            });
        }, 200);

        console.log(this.props.flipped);
    }

    render() {
        return (
            <>
                <div className={
                    this.props.flipped.flip ?
                        "flip card" :
                        "card"
                } style={{
                    ...style,
                    background: this.props.flipped.showfront ? "#1e90ff" : "#888"
                }} onClick={
                    () => this.flip()
                }>

                    {
                        /////////////////////////////////////////////////////////////
                        //                        Innerhtml                        //
                        /////////////////////////////////////////////////////////////
                        this.props.flipped.showfront ? this.props.front : this.props.back
                    }
                </div>
            </>
        );
    }

}

const style = {
    background: "#1e90ff",
    padding: "10px",
    width: "750px",
    height: "350px",
    borderRadius: 4,
    color: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
};
