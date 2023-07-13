module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      totalPrice: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isNumeric: true,
        // },
      },
      statusDelivery: {
        type: DataTypes.ENUM("pending", "success"),
        allowNull: false,
        defaultValue: "pending",
      },
      statusOrder: {
        type: DataTypes.ENUM("pending", "success"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      underscored: true,
    }
  );
  Order.associate = (models) => {
    Order.hasOne(models.Payment, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.hasOne(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Order;
};
