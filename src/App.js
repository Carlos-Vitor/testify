import React, { Component } from 'react';
import './App.css';
import LoginControl from './components/loginControl';

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
