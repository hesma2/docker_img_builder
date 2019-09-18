import React, {Component } from 'react';
import './App.css';
import SelectOS from './SelectOS';
import ImgList from './ImgList';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <SelectOS store={this.props.store}></SelectOS>
        </div>
        <div>
          <ImgList store={this.props.store}></ImgList>
        </div>
      </div>
    )
  }
}

export default App;
