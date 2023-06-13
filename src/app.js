require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authRouter = require("./routes/auth-route");
const adminRouter = require("./routes/admin-routes");
const productRouter = require("./routes/product-routes");
const cartRouter = require("./routes/cart-routes");
const app = express();
//secure
app.use(cors());
app.use(helmet());
//check
app.use("/images", express.static("public/images"));
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 50,
//   })
// );
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/", productRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(process.env.PORT || 8000, () =>
  console.log("Server running on port: ", process.env.PORT)
);
