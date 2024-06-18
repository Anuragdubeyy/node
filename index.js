const express = require("express");
const userRoutes = require("./routes/user")
const {connectMongoDb } = require("./connection")
const {logReqRes} = require("./middelwares/index")

const app = express();
const PORT = 8000;

// connection mongoose
connectMongoDb("mongodb://127.0.0.1:27017/node-1").then(() => console.log("mongoDB connected"))
.catch((err) => console.log("mongo error", err));

// middleware - plugins
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("./log.txt"));

// routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`server strated at PORT:${PORT}`));
