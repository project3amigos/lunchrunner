const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

router
.route("/")
.get(ordersController.findAll)

.post(ordersController.create);

router
.route("/:id")
.get(ordersController.findOne)
.put(ordersController.update)
.delete(ordersController.delete);

// router
// .route("/open")
// .get(ordersController.findOpen);

module.exports = router;

//bundled in api/index