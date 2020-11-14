import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    const parametros = this.getHashParams();
    this.token = parametros.access_token;
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

  render() {
    return (
      <div className="App">
        <button><a href="http://localhost:8888/"> Logar com Spotify </a></button>
        <button onClick={this.topTracks}> Buscar top tracks </button>
      </div>
    );
  }
}

export default App;
