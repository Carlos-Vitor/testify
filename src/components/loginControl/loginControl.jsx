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
            images: [],
            playlist: []
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
    
    playlists = () =>{
        $.ajax({
          method: "GET", 
          dataType: "json",
          url: "https://api.spotify.com/v1/me/playlists",
          headers: {        
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(dados => {
            this.setState({
                playlist: dados.items
            });
            console.log(dados.items);
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
        let buttonPlaylist;
        let imagem = this.state.images;
        let playlists = this.state.playlist;
        console.log(imagem);
        
        buttonPlaylist = <Button onClick={this.playlists} texto="Listar Playlists"/>;
        buttonLogin = <Button href="http://localhost:8888/" texto="Login no Spotify"/>;


        return(
            <div className="login-control">
                <aside>
                    <ul className="image">
                        {imagem.map(img =>(
                            <img key = "1" src={img.url} alt=""/>
                        ))}  
                    </ul>
                    <Perfil nome={this.state.nome} email={this.state.email} ></Perfil>
                    <div className="buttons">
                        {buttonLogin}
                        {buttonPlaylist}
                        <Button onClick={this.perfil} texto="Mostrar Perfil"/>
                    </div>
                </aside>
                <div className="playlist">
                    <ul>
                        {playlists.map(item => (
                            <li key={item.id}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default LoginControl;