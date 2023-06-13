module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      status: {
        type: DataTypes.ENUM("pending", "success"),
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isNumeric: true,
        },
      },
      slipImage: {
        type: DataTypes.STRING,
        allowNull: false,
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
