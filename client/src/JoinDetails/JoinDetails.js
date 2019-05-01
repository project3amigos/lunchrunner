import React, { Component } from 'react';
import API from '../utils/API';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
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
      headOrder: this.props.location.state.headOrder || {},
      orderDetails: [],
      submitted: false,
      render: this.props.location.state.render
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getOrder() {
    if (this.state.render) {
      const id = this.state.selectedOrderId;
      console.log(id);
      API.getOrder(id).then(res => {
        this.setState({
          headOrder: res.data
        });
        console.log(this.state.headOrder);
      });
    }
  }

  getOrderDetails = () => {
    const id = this.state.selectedOrderId;
    console.log(id);
    API.getDetails(id).then(res => {
      this.setState({
        orderDetails: res.data
      });
      console.log(this.state.orderDetails);
    });
  };

  componentDidMount() {
    this.getOrder();
    this.getOrderDetails();
  }

  createEntryClick = event => {
    const value = this.state;
    const newOrder = {
      user: value.userValue,
      userOrder: value.userOrderValue,
      OrderId: this.state.headOrder.id
    };
    event.preventDefault();
    API.createDetails(newOrder)
      .then(
        this.setState(prevState => ({
          orderDetails: [newOrder, ...prevState.orderDetails]
        }))
      )
      .catch(err => {
        console.log(err);
      });
    this.setState({
      userValue: '',
      userOrderValue: ''
    });
  };

  submitOrder = event => {
    const id = this.state.selectedOrderId;
    event.preventDefault();
    API.updateOrderStatus(id)
      .then(console.log('submitted'))
      .catch(err => {
        console.log(err);
      });
    this.setState({
      submitted: true
    });
  };

  render() {
    if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: '/final',
            state: { selectedOrderId: this.state.selectedOrderId }
          }}
        />
      );
    }
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <h1 className="text-center">{this.state.headOrder.name}</h1>
            <h2 className="text-center">{this.state.headOrder.restaurant}</h2>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderDetails.map(detail => (
                  <tr key={detail.id}>
                    <td>{detail.user}</td>
                    <td>{detail.userOrder}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel> - Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.userValue}
                name="userValue"
                placeholder="Enter your name here"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>
                <em>This is how you will be identified on the order.</em>
              </HelpBlock>

              <ControlLabel> - What do you want?</ControlLabel>
              <FormControl
                type="text"
                value={this.state.userOrderValue}
                name="userOrderValue"
                placeholder="Put what you want to eat here"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>
                <em>Make sure to be specific, ain't nobody got time for that.</em>
              </HelpBlock>
            </FormGroup>
            <Button size="lg" block onClick={this.createEntryClick} bsStyle="primary">
              Add to Order
            </Button>
            <br />
            <br />
            <Button size="lg" bsStyle="success" block onClick={this.submitOrder}>
              Submit Order
            </Button>
            <hr />
          </div>
        )}
      </div>
    );
  }
}

export default JoinDetails;
