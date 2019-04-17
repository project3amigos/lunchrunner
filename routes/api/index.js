const router = require("express").Router();
const orderRoutes = require("./order");

// Book routes
router.use("/order", orderRoutes);

module.exports = router;