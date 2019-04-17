const db = require("../models");

module.exports = {
  create: function(req, res) {
    db.Details.create(req.body)
      .then(order => res.status(200).send(order))
      .catch(err => res.status(400).send(err));
  },
  findAll: function(req, res) {
    db.Details.findAll({
      include:[db.Order]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    })
  },
  findOne: function(req, res) {
    db.Details.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Order]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    })
  },
  delete: function(req, res) {
    db.Details.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder){
      res.json(dbOrder);
    })
  }
};