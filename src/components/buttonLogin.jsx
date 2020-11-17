import React, { Component } from "react";

class ButtonLogin extends Component {
    render() {
        return (
            <a href="http://localhost:8888/"><button onClick={this.props.onClick}> {this.props.texto} </button></a>
        )
    }

}

export default ButtonLogin;