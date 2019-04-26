module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    // Giving the Order model a name of type STRING
    name: DataTypes.STRING,
    userId: DataTypes.STRING,
    restaurant: DataTypes.STRING,
    runner: DataTypes.STRING,
    runnerPhone: DataTypes.STRING,
    pickupDate: { type: DataTypes.DATEONLY/*, defaultValue: sequelize.NOW*/},
    submitted: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  Order.associate = function(models) {
    // Associating Order with Details
    // When an Order is deleted, also delete any associated Details
    Order.hasMany(models.Details, {
      onDelete: "cascade"
    });
  };

  return Order;
};

//accquired in ordersController
