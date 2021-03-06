import React, { Component } from 'react';
import $ from 'jquery';
import Button from '../buttonLogin/buttonLogin';
import Perfil from '../perfil/perfil';
import './estilo.css';

class LoginControl extends Component {

    constructor(props) {
        super(props);
        const parametros = this.getHashParams();
        this.token = parametros.access_token; // armazenado o token recebido
        this.newToken = parametros.refresh_token;
        this.texto = "";
        this.href = "";    
        this.state = {
            nome : "",
            email: "",
            images: [], //array recebido da API com a imagem do usuário
            playlist: [],   //array recebido da API com a lista de playlists
            pesquisa: [], //array recebido da api com o resultado da pesquisa
            search: "", //vairável que vai na url de pesquisa da API
            type: ""    //tipo de pesquisa, se é música ou artista
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    getHashParams() {  //function que gera o mesmo token criado no programa exemplo do Spotify
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
          e = r.exec(q);
        }
        //console.log(this.token);
        return hashParams;
    }
    
    playlists = () =>{ // Chamda ajax para pegar a lista de playlists
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
            //console.log(dados);
        })
    }


    perfil = () =>{ // chamada para pegar as informações do usuário logado
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
            //console.log(dados);
        })
    }

    pesquisas = () =>{ // chamada para pegar informação do que for pesquisado
        $.ajax({
          method: "GET", 
          dataType: "json",
          url: "https://api.spotify.com/v1/search?q=" + this.state.search + "&type=" + this.state.type,
          headers: {        
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(dados => {
            if(this.state.type === "artist"){ 
            this.setState({
                 pesquisa: dados.artists.items
             });
            } else {
                this.setState({
                    pesquisa: dados.tracks.items
                })
            }
            console.log(dados);
        })
        
    }

    // eventos para alteração estado do tipo e do resutlado da pesquisa

    handleSearch(event){
        this.setState({search: event.target.value});
    }

    handleType(event){
        this.setState({type: event.target.value});
    }

    render() {
        
        let buttonLogin;
        let buttonPlaylist;
        let buttonPerfil;
        let imagem = this.state.images;
        let playlists = this.state.playlist;
        let pesquisas = this.state.pesquisa;
        //console.log(pesquisas);
        
        buttonPlaylist = <Button onClick={this.playlists} texto="Playlists seguidas"/>;
        buttonLogin = <Button href="http://localhost:8888/" texto="Login no Spotify"/>;
        buttonPerfil = <Button onClick={this.perfil} texto="Mostrar Perfil"/>;


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
                        {buttonPerfil}
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
                <div className="pesquisa">
                    <input placeholder="artista/musica" type="search" name="search" id="search" value={this.state.value} onChange={this.handleSearch}/>
                    <button onClick={this.pesquisas}> Pesquisar </button>
                    <div className="opcoes">
                        <span>
                            <input type="radio" name="type" id="artist" value="artist" onChange={this.handleType}/>
                            <p>Artista</p>
                        </span>
                        <span>
                            <input type="radio" name="type" id="track" value="track" onChange={this.handleType}/>
                            <p>Música</p>
                        </span>
                    </div>                
                </div>
                <div className="playlist">
                    <ul>
                        {pesquisas.map(item => (
                            <li key={item.id}>
                                {<a href={item.external_urls.spotify}> {item.name} </a>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default LoginControl;
