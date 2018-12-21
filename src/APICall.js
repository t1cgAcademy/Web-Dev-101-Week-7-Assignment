import React, { Component } from 'react';

class APICall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
      .then(parsedJSON =>
        parsedJSON.results.map(user => ({
          user: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          location: `${user.location.street} ${user.location.city}`
        }))
      )
      .then(contacts =>
        this.setState({
          data: contacts,
          isLoading: false
        })
      )
      .catch(err => console.log('Error', err));
  };

  render() {
    const { isLoading, data } = this.state;
    if (isLoading)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    return (
      <div>
        {!isLoading && data.length > 0
          ? data.map(contact => {
              const { username, email } = contact;
              return (
                <p key={username}>
                  {username} , {email}
                </p>
              );
            })
          : null}
      </div>
    );
  }
}
export default APICall;
