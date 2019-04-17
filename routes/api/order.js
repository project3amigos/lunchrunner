const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

router
.route("/")
.get(ordersController.findAll)
.post(ordersController.create);

router
.route("/:id")
.get(ordersController.findOne)
.delete(ordersController.delete);

module.exports = router;