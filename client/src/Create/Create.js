import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class Create extends Component {
  login() {
    this.props.auth.login();
  }
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
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
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Enter the Name of the Order Below</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Order Name"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>This should be something that everyone on the order will recognize.</HelpBlock>

                  <ControlLabel>Restaurant Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Restaurant Name"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Validation is based on string length.</HelpBlock>

                  <ControlLabel>Order Date</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Date the order will be picked up"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Validation is based on string length.</HelpBlock>

                  <ControlLabel>Runner</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Person that will be picking up the order.</HelpBlock>
                </FormGroup>
              </form>
              <Button variant="success" size="lg" block>
                Create Order
  </Button>
            </div>
          )
        }
      </div>
    );
  }
}

export default Create;
