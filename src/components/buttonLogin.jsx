import React, { Component } from "react";

class ButtonLogin extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}><a href="http://localhost:8888/"> {this.props.texto} </a></button>
        )
    }

}

export default ButtonLogin;