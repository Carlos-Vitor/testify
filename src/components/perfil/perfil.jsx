import React, { Component } from 'react';
import './estilo.css';

class Perfil extends Component{

    render() {
        return (
            <div className="perfil-div">
                <p> Nome: {this.props.nome} </p>
                <p> Email: {this.props.email} </p>
            </div>
        )
    }
}

export default Perfil;