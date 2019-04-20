const db = require("../models");

module.exports = {
  create: function(req, res) {
    console.log(req.body);
    db.Order.create(req.body)
      .then(order => res.status(200).send(order))
      .catch(err => res.status(400).send(err));
  },
  findAll: function(req, res) {
    db.Order.findAll({
      include: [db.Details]
    })
      .then(order => res.status(200).send(order))
      .catch(err => res.status(400).send(err));
  },
  findOne: function(req, res) {
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Details]
    })
      .then(order => res.status(200).send(order))
      .catch(err => res.status(400).send(err));
  },
  delete: function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(order => res.status(200).send(order))
      .catch(err => res.status(400).send(err));
  }
};

//accquired in api.order