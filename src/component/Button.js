import { Component } from 'react';

import "./style.css";

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="button" style={buttonStyle} onClick={() => this.props.callback(this.props.confidence)}>
                {this.props.children}
            </div >
        );
    }
}


const buttonStyle = {
    background: "#00BFFF",
    color: "#FFF",
    padding: "8px",
    borderRadius: 4,
    cursor: "pointer",
    marginRight: "4px",
    fontFamily: "Arial"
};


export default Button;
