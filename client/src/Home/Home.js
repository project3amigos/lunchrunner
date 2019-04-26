import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <h4>
              You are logged in! You can now view your{' '}
              <Link to="profile"><strong>profile area</strong></Link>
              .
          </h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              Welcome to Lunch Runner!  Please{' '}
              <Link
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
                to="login"
              >
                <strong>Log In</strong>
            </Link>
              {' '}to continue.
          </h4>
          )
        }
      </div>
    );
  }
}

export default Home;
