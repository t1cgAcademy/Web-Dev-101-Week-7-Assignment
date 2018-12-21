import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Child from './Child';
import APICall from './APICall';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'John',
      width: window.innerWidth
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    document.title = this.state.name;
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    document.title = this.state.name;
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  changeState = () => {
    this.setState({ name: 'Bob' });
  };

  unmount = () => {
    this.setState({
      name: 'Robert'
    });
  };

  render() {
    console.log('render');
    if (this.state.name === 'Robert') {
      return <div>Unmounted</div>;
    }
    return (
      <div className="App">
        <h1>Hello</h1>
        <Child name={this.state.name} />
        <h1>Width: {this.state.width}</h1>
        <button onClick={this.changeState}>
          Change Document Title and Change State
        </button>
        <button onClick={this.unmount}>Unmount component</button>
        <APICall />
      </div>
    );
  }
}

export default App;
