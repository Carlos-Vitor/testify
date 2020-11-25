import React, { Component } from 'react';
import './App.css';
//import FormPesquisa from './components/formularioPesquisa/formPesquisa';
import LoginControl from './components/loginControl/loginControl';

class App extends Component {
  render(){
    return(
      <section>
        <LoginControl></LoginControl>
      </section>
    );
  }
}

export default App;
