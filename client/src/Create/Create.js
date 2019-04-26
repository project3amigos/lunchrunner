import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import API from '../utils/API';
import './Create.css';
import uniqid from 'uniqid';
import { Redirect } from 'react-router-dom';


// import { Link } from 'react-router-dom';

class Create extends Component {
  login() {
    this.props.auth.login();
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: '',
      orderValue: '',
      restaurantValue: '',
      runnerValue: '',
      phoneValue: '',
      dateValue: '',
      completed: false,
      newOrderId: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  createOrderClick = event => {
    alert('Order Succesfully Created');
    const value = this.state;
    event.preventDefault();
    API.createOrder({
      id: uniqid(),
      name: value.orderValue,
      userId: 'me',
      restaurant: value.restaurantValue,
      runner: value.runnerValue,
      runnerPhone: value.phoneValue,
      pickupDate: value.dateValue
    }).catch(err => {
      console.log(err);
    });
    this.setState({
      orderValue: '',
      restaurantValue: '',
      runnerValue: '',
      phoneValue: '',
      dateValue: '',
      completed: true
    });
    API.getOrder(this.state.id);
    // completed: true,
    // newOrderId: ''
  };

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          to={{
            pathname: '/joindetails',
            state: { selectedOrderId: this.state.id }
          }}
        />
      );
    }
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <h4>Start filling out your form below to begin</h4>
            <hr />
            <form>
              <FormGroup
                controlId="formBasicText"
                /* validationState={this.getValidationState()} */
              >
                <ControlLabel>
                  {' '}
                  - Enter the Name of the Order Below
                </ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.orderValue}
                  name="orderValue"
                  placeholder="Order Name"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  <em>
                    This should be something that everyone on the order will
                    recognize.
                  </em>
                </HelpBlock>

                <ControlLabel> - Restaurant Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.restaurantValue}
                  name="restaurantValue"
                  placeholder="Restaurant Name"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  <em>Input the name of the desired restaurant here.</em>
                </HelpBlock>

                <ControlLabel> - Order Date</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.dateValue}
                  name="dateValue"
                  placeholder="Date the order will be picked up"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  <em>Enter either todays date or a future date if needed.</em>
                </HelpBlock>

                <ControlLabel> - Runner</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.runnerValue}
                  name="runnerValue"
                  placeholder="Runner"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  <em>Person that will be picking up the order.</em>
                </HelpBlock>

                <ControlLabel>Runner phone number</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.phoneValue}
                  name="phoneValue"
                  placeholder="Runner phone number"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  <em>So we can send a text with completed order.</em>
                </HelpBlock>
              </FormGroup>
            </form>
            <Button
              size="lg"
              bsStyle="primary"
              block
              onClick={this.createOrderClick}>
              Create Order
            </Button>
            <hr />
          </div>
        )}
      </div>
    );
  }
}

export default Create;
