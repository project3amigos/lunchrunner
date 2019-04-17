const router = require("express").Router();
const orderRoutes = require("./order");

// Book routes
router.use("/orders", orderRoutes);

module.exports = router;