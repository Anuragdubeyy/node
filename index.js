const express = require("express");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

const fs = require("fs");
const { type } = require("os");
const { timeStamp } = require("console");

const app = express();
const PORT = 8000;

// connetion mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/node-1")
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("mongo error", err));

// Schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
  },
  gender: {
    type: String,
  },
}, {timeStamp: true});

// model
const User = mongoose.model("User", userSchema);

// middleware - plugins
app.use(express.urlencoded({ extended: false }));
// ROUTES

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method} : ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({})
  const html = `
    <ul>
    ${allDbUsers.map((users) => `<li>${users.first_name} - ${users.email}</li>`)}
    </ul>`;
  res.send(html);
});

// REST API
// for all users
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({})

  return res.json(allDbUsers);
});

// for user id 1
app.get("/api/users/:id", async (req, res) => {
  const allDbUsers = await User.find({})

  const id = Number(req.params.id);
  const user = allDbUsers.find((user) => user.id === id);
  return res.json(user);
});

app
  .route("/api/users/:id")
  .get( async (req, res) => {
    const user = await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).send("user not found");
    return res.json(user);
  })
  .patch( async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "changed"});
    // TOOD: Edit the user with id
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    // TOOD: Edit the user with id
    return res.json({ status: "success" });
  });

// create new user
app.post("/api/users", async (req, res) => {
  // TOOD: Edit the user with id
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ mes: "all filed is required" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log("result", result);
  return res.json({
    status: "success",
  });

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).res.json({ status: "success", id: users.length });
  // });
});

// app.patch("/api/users/:id", (req, res) => {
//     // TOOD: Edit the user with id
//     return res.json({ status:"pending"});
// })

// app.delete("/api/users/:id", (req, res) => {
//     // TOOD: Edit the user with id
//     return res.json({ status:"pending"});
// })
app.listen(PORT, () => console.log("server connected!"));
