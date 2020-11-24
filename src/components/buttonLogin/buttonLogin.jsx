import React, { Component } from "react";
import "./estilo.css";

class Button extends Component {
    render() {
        return (
            <a href={this.props.href}><button className="button-component" onClick={this.props.onClick}> {this.props.texto} </button></a>
        )
    }

}

export default Button;