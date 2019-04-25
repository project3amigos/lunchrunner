import React, { Component } from 'react';
import { Navbar, Button, Jumbotron } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand className="navbarcss">Lunch Runner</Navbar.Brand>
            <Button
              bsStyle="info"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {!isAuthenticated() && (
              <Button
                id="qsLoginBtn"
                bsStyle="success"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'profile')}
              >
                Profile
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                id="qsLogoutBtn"
                bsStyle="info"
                className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
        </Navbar>
        {!isAuthenticated() && (
          <Jumbotron className="text-center">
            <h1>Lunch Runner</h1>
            <p>Sign up for a free account to start or join an order.</p>
            <p>
              <Button className="secondary">Learn more</Button>
            </p>
          </Jumbotron>
        )}

        {isAuthenticated() && (
          <Jumbotron className="text-center">
            <h1>Lunch Runner</h1>
            <p id="loggedIn">
              Welcome to Lunch Runner! Please click either the 'Create Order'
              button to create a new order or 'Join Order' to join an already
              existing order.
            </p>
            <p>
              <Button
                bsStyle="primary"
                className="btn-margin btn-warning"
                onClick={this.goTo.bind(this, 'create')}
              >
                Create Order
              </Button>
              <Button
                bsStyle="primary"
                className="btn-margin btn-success"
                onClick={this.goTo.bind(this, 'join')}
              >
                Join Order
              </Button>
            </p>
          </Jumbotron>
        )}
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;