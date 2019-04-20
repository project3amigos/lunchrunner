import axios from 'axios';

export default {
    createOrder: function(orderData) {
        console.log(orderData);
        return axios.post('/api/orders', orderData);
    }
};