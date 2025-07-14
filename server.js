require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const handleErrors = require("./middlewares/errorMiddleware");
const userRouter = require("./routes/userRoute");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", userRouter);

app.use(notFoundMiddleware);
app.use(handleErrors);

const PORT = 3001 || process.env.PORT;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);
