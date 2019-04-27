import React, { Component } from 'react';
import API from '../utils/API';
import { Button, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class Final extends Component {
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
      headOrder: {},
      orderDetails: [],
      submitted: false
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
    API.getOrder(id).then(res => {
      this.setState({
        headOrder: res.data
      });
      console.log(this.state.headOrder);
    });
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


  render() {
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
          </div>
        )}
      </div>
    );
  }
}

export default Final;
