import React, { Component } from 'react';
import API from '../utils/API';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class JoinDetails extends Component {
  login() {
    this.props.auth.login();
  }
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedOrderId: this.props.location.state.selectedOrderId,
      userValue: '',
      userOrderValue: '',
      OrderId: '',
      headOrder: {}
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getOrder() {
    const id = this.state.selectedOrderId;
    API.getOrder(id).then( res => {
      this.setState({
        headOrder: res.data
      });
      console.log(res.data);
      console.log(this.state.headOrder);
    });
    
  }

  componentDidMount() {
    this.getOrder();
  }

  createEntryClick = event => {
    alert("Order Succesfully Submitted")
    const value = this.state;
    event.preventDefault();
    API.createDetails({
      user: value.userValue,
      userOrder: value.userOrderValue,
      OrderId: this.state.headOrder.id
    }).catch(err => {
      console.log(err);
    })
    this.setState({
      userValue: '',
      userOrderValue: ''
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <h1 className="text-center">{this.state.headOrder.name}</h1>
            <h2 className="text-center">{this.state.headOrder.restaurant}</h2>
            <FormGroup
                  controlId="formBasicText"
                  /* validationState={this.getValidationState()} */
                >
                  <ControlLabel>Name</ControlLabel>
                  <FormControl 
                    type="text"
                    value={this.state.userValue}
                    name="userValue"
                    placeholder="Enter your name here"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>This is how you will be identified on the order.</HelpBlock>

                  <ControlLabel>What do you want?</ControlLabel>
                  <FormControl 
                    type="text"
                    value={this.state.userOrderValue}
                    name="userOrderValue"
                    placeholder="Put what you want to eat here"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Make sure to be specific, ain't nobody got time for that.</HelpBlock>
                </FormGroup>
            <Button size="lg" block onClick={this.createEntryClick}>
              Add to Order
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default JoinDetails;
