import { Component } from 'react';
import "./style.css";

function InputText(props) {
    return (
        <textarea className="input-text" id={props.id} placeholder={props.placeholder}></textarea>
    );
}


export default InputText;

