import React, { Component } from 'react';
import $ from 'jquery';
import ButtonLogin from './buttonLogin';

class LoginControl extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        const parametros = this.getHashParams();
        this.token = parametros.access_token;
        this.texto = "Login";
        //this.state = {isLoggedIn: false};
        if(this.token != null){
            this.state = {isLoggedIn: true}
        } else {
            this.state = {isLoggedIn: false};
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

    handleLoginClick = () => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        })
        console.log(this.state.isLoggedIn)
        
    }

    // handleLoginClick() {
    //     if(this.isLoggedIn = true){
    //         this.setState({isLoggedIn: false});
    //         this.link = "http://localhost:3000/";
    //         console.log(this.isLoggedIn);
    //     } else {
    //         this.setState({isLoggedIn: true});
    //         this.link = "http://localhost:8888/";
    //         console.log(this.isLoggedIn);
    //     }
    // }

    render() {
        let isLoggedIn = this.state.isLoggedIn;
        let buttonLogin;
        let buttonTopTrack;
        if (isLoggedIn === true){
            buttonLogin = <h1>Aproveite as interações</h1>;
            buttonTopTrack = <button onClick={this.topTracks}> Buscar top tracks </button>;
            //console.log(isLoggedIn);
        } else {
            buttonLogin = <ButtonLogin onClick={this.handleLoginClick} texto={this.texto}></ButtonLogin>;
            buttonTopTrack = <h1> Faça login </h1>;
            //console.log(isLoggedIn);
        }

        return(
            <div>
                {buttonLogin}
                {buttonTopTrack}
            </div>
        );
    }
}
export default LoginControl;