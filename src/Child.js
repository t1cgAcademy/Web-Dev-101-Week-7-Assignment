import React, { Component } from 'react';

class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('child componentDidMount');
  }

  // Prevents child from updating from John => Bob
  shouldComponentUpdate() {
    console.log('child shouldComponentUpdate');
    return false;
  }

  componentWillUnmount() {
    console.log('child componentWillUnmount');
  }

  render() {
    console.log('child render');
    return <div>Child {this.props.name}</div>;
  }
}

export default Child;
