const router = require("express").Router();
const orderRoutes = require("./order");
const detailsRoutes = require("./details");

// Book routes
router.use("/orders", orderRoutes);
router.use("/details", detailsRoutes)

module.exports = router;