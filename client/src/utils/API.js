import axios from 'axios';

export default {
    createOrder: function(orderData) {
        console.log(orderData)
        return axios.post('/api/orders', orderData);
    },
    getAllOrders: function() {
        return axios.get('/api/orders');
    },
    getOpenOrders: function() {
        return axios.get('/api/orders/open');
    },
    getOrder: function(id) {
        return axios.get('/api/orders/' + id);
    },
    createDetails: function(detailsData) {
        return axios.post('/api/details', detailsData);
    },
    getDetails: function(id) {
        return axios.get('/api/details/'+ id)
    }
};