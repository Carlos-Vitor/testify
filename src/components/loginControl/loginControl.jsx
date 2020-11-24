import React, { Component } from 'react';
import $ from 'jquery';
import Button from '../buttonLogin/buttonLogin';
import Perfil from '../perfil/perfil';
import './estilo.css';

class LoginControl extends Component {

    constructor(props) {
        super(props);
        const parametros = this.getHashParams();
        this.token = parametros.access_token;
        this.newToken = parametros.refresh_token;
        this.texto = "";
        this.href = "";    
        this.state = {
            nome : "",
            email: "",
            images: []
        };
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
          dataType: "json",
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

    perfil = () =>{
        $.ajax({
            method: "GET", 
            dataType: "json",
            url: "https://api.spotify.com/v1/me",
            headers: {        
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(dados => {
            this.setState({ 
                nome : dados.display_name,
                email : dados.email,
                images : dados.images
            });
            console.log(dados);
        })
    }

    render() {
        
        let buttonLogin;
        let buttonTopTrack;
        let imagem = this.state.images;
        console.log(imagem);
        
        buttonTopTrack = <Button onClick={this.topTracks} texto="Buscar top tracks"/>;
        buttonLogin = <Button href="http://localhost:8888/" texto="Acesso ao token"/>;


        return(
            <div className="login-control">
                <ul>
                  {imagem.map(img =>(
                      <img key = "1" src={img.url} alt=""/>
                      ))}  
                </ul>
                <Perfil nome={this.state.nome} email={this.state.email} ></Perfil>
                <div className="buttons">
                    {buttonLogin}
                    {buttonTopTrack}
                    <Button onClick={this.perfil} texto="clique aqui"/>
                </div>
            </div>
        );
    }
}
export default LoginControl;