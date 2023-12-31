module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10),
        allowNull: false,
        // validate: {
        //   isNumeric: true,
        // },
        // get() {
        //   const rawValue = this.getDataValue("price");
        //   const formattedValue = new Intl.NumberFormat("th-TH").format(
        //     rawValue
        //   );
        //   return formattedValue;
        // },
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      underscored: true,
    }
  );
  Product.associate = (models) => {
    Product.hasMany(models.Cart, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Product;
};
