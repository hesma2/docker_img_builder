import React, {Component } from 'react';
import './App.css';
import SelectOS from './SelectOS';

class App extends Component {
  render() {
    return (
      <div>
        <SelectOS store={this.props.store}></SelectOS>
      </div>
    )
  }
}

export default App;
