import React from 'react';
import { Component } from 'react';

import "./style.css";

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showfront: true,
            flip: false,
        };
    }

    flip() {
        this.props.updateCardFlippedStatus(prev => { return { showfront: !this.props.flipped.showfront, flip: true }; });

        setTimeout(() => {
            // this.state = this.setState(prev => {
            this.props.updateCardFlippedStatus(prev => {
                return { ...prev, flip: false };
            });
        }, 200);
        console.log(this.props.flipped);
    }

    render() {
        return (
            <>
              <div className={this.props.flipped.flip ? "flip card" : "card"} style={{ ...style, background: this.props.flipped.showfront ? "#1e90ff" : "#888" }} onClick={() => this.flip()}>
                    {
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
}
