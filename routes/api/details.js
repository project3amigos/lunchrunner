const router = require("express").Router();
const detailsController = require("../../controllers/detailsController");

router
.route("/")
.get(detailsController.findAll)
.post(detailsController.create)

router
.route("/:id")
.get(detailsController.findOne)
.delete(detailsController.delete);

module.exports = router;

//bundled in api/index