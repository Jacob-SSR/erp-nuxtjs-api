require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { handleErrors } = require("./middlewares/error");
const { notfound } = require("./utils/notFound");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const materialRouter = require("./routes/materialRoute");
const stockMaterialRouter = require("./routes/stockMaterialRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", materialRouter);
app.use("/api", stockMaterialRouter);

app.use(handleErrors);
app.use(notfound);

const PORT = 3001 || process.env.PORT;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);
