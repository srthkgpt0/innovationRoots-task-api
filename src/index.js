const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
const app = express();
var cors = require("cors");
const port = process.env.PORT;
const multer = require("multer");
const upload = multer({ dest: "images" });
app.post("/upload", upload.single("upload"), async (req, res) => {
  res.send();
});
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use("/auth", userRouter);
app.use(taskRouter);
app.listen(port, () => {
  console.log("Server is up at " + port);
});
