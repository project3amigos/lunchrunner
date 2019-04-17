const db = require("../models");

module.exports = {
  create: function(req, res) {
    db.Order.create(req.body)
      .then(order => res.status(200).send(order))
      .catch(err => res.status(400).send(err));
  }
};
