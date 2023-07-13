module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      status: {
        type: DataTypes.ENUM("pending", "success"),
        allowNull: false,
        defaultValue: "pending",
      },
      slipImage: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );
  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Payment;
};
