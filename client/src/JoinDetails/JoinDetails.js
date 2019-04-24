import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import API from '../utils/API';
// import { Link } from 'react-router-dom';

class JoinDetails extends Component {
  login() {
    this.props.auth.login();
  }
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedOrderId: this.props.location.state.selectedOrderId
    };
  }

  getOrder() {
    console.log(this.state.selectedOrderId)
  }

  componentDidMount() {
    this.getOrder();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <h4>{this.state.selectedOrderId}</h4>
            <Button size="lg" block onClick={this.createOrderClick}>
              Submit Order
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default JoinDetails;
