import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
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
      orderValue: '',
      restaurantValue: '',
      runnerValue: '',
      dateValue: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  createOrderClick = event => {
    alert("Order Succesfully Created")
    const value = this.state;
    event.preventDefault();
    API.createOrder({
      name: value.orderValue,
      userId: "me",
      restaurant: value.restaurantValue,
      runner: value.runnerValue,
      pickupDate: value.dateValue  
    }).catch(err => {
      console.log(err);
    })
    this.setState({
      orderValue: '',
      restaurantValue: '',
      runnerValue: '',
      dateValue: ''
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
              <h4>
                Start filling out your form below to begin
              </h4>

              <form>
                <FormGroup
                  controlId="formBasicText"
                  /* validationState={this.getValidationState()} */
                >
                  <ControlLabel> - Enter the Name of the Order Below</ControlLabel>
                  <FormControl 
                    type="text"
                    value={this.state.orderValue}
                    name="orderValue"
                    placeholder="Order Name"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock><em>This should be something that everyone on the order will recognize.</em></HelpBlock>

                  <ControlLabel> - Restaurant Name</ControlLabel>
                  <FormControl 
                    type="text"
                    value={this.state.restaurantValue}
                    name="restaurantValue"
                    placeholder="Restaurant Name"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock><em>Input the name of the desired restaurant here.</em></HelpBlock>

                  <ControlLabel> - Order Date</ControlLabel>
                  <FormControl 
                    type="text"
                    value={this.state.dateValue}
                    name="dateValue"
                    placeholder="Date the order will be picked up"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock><em>Enter either todays date or a future date if needed.</em></HelpBlock>

                  <ControlLabel> - Runner</ControlLabel>
                  <FormControl 
                    type="text"
                    value={this.state.runnerValue}
                    name="runnerValue"
                    placeholder="Runner"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock><em>Person that will be picking up the order.</em></HelpBlock>
                </FormGroup>
              </form>
              <Button size="lg" block onClick={this.createOrderClick}>
                Create Order
  </Button><hr></hr>
            </div>
          )
        }
      </div>
    );
  }
}

export default Create;
