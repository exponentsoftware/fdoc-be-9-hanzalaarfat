const express = require("express");
const db = require("./Models");
const dotenv = require("dotenv");
dotenv.config();

const todoRoute = require("./router/todorouter");
const userRoute = require("./router/userRouter");
const adminRoute = require("./router/adminRoute");
const likeRoute = require("./router/likeRouter");

const app = express();
app.use(express.json());
db.sequelize.sync();
// db.sequelize.sync({ force: true });

app.use("/todo", todoRoute);

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/user", likeRoute);

app.listen(3000, () => {
  console.log("Server is up and running at the port 3000");
});
