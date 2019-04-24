import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import API from '../utils/API';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class Join extends Component {
  login() {
    this.props.auth.login();
  }
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      orderNames: [],
      selectedOrderId: 0,
      completed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.passOrder = this.passOrder.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedOrderId: event.target.value });
  }

  getAllOrders() {
    API.getAllOrders().then(res =>
      this.setState({
        orderNames: res.data
      })
    );
  }

  passOrder = event => {
    this.setState({ completed: true });
    event.preventDefault();
    console.log(this.state.selectedOrderId);
  };

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

  render() {
    if (this.state.completed) {
      return (
        <Redirect
          to={{
            pathname: '/joindetails',
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
            <form>
              <select
                onChange={this.handleChange}
                value={this.state.selectedOrderId}>
                <option>Please choose an order to join</option>
                {this.state.orderNames.map(order => (
                  <option key={order.id} value={order.id}>
                    {order.name}
                  </option>
                ))}
              </select>
              <Button size="lg" block onClick={this.passOrder}>
                Join Order
              </Button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Join;
