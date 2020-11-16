import React, { Component } from 'react';
import $ from 'jquery';
import ButtonLogin from './buttonLogin';

class LoginControl extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = {isLoggedIn: false};
        const parametros = this.getHashParams();
        this.token = parametros.access_token;
        if(this.state = false){
            this.texto = "Login";
        } else {
            this.texto = "Logout";
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
          e = r.exec(q);
        }
        console.log(this.token);
        return hashParams;
    }
    
      topTracks = () =>{
        $.ajax({
          method: "GET", 
          dataType: "Json",
          url: "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=BR",
          headers: {        
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(dados => {
          console.log(dados.tracks[0].name);
          console.log(this.topTracks);
        })
    }

    handleLoginClick() {
        if(this.isLoggedIn = false){
            this.setState({isLoggedIn: true});
        } else {
            this.setState({isLoggedIn: false});
        }
    }

    render() {
        let isLoggedIn = this.state.isLoggedIn;
        let buttonTopTrack;
        if (isLoggedIn = true){
            buttonTopTrack = <button onClick={this.topTracks}> Buscar top tracks </button>
        } else {
            buttonTopTrack = <h1> Faça login </h1>
        }

        return(
            <div>
                <ButtonLogin onClick={this.handleLoginClick} texto={this.texto}></ButtonLogin>
                {buttonTopTrack}
            </div>
        );
    }
}
export default LoginControl;