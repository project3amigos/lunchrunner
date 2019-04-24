import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Form
} from 'react-bootstrap';
import API from '../utils/API';
// import { Link } from 'react-router-dom';

class Create extends Component {
  login() {
    this.props.auth.login();
  }
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      orderNames: []
    };
  }

  getAllOrders() {
    API.getAllOrders().then(res =>
      this.setState({
        orderNames: res.data
      })
    );
    console.log(this.state);
  }

  componentDidMount() {
    this.getAllOrders();
  }

  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // };

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
            <select>
              {this.state.orderNames.map(order => (
                <option key={order.id}>{order.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default Create;
