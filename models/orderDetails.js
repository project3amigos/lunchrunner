module.exports = function(sequelize, DataTypes) {
    var Details = sequelize.define( "Details", {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      userOrder: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      }
    });
  
 Details.associate = function(models) {
      // We're saying that a Details should belong to an Order
      // A Details can't be created without an Order due to the foreign key constraint
     Details.belongsTo(models.Order, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Details;
  };
  
  //accquired in detailsController