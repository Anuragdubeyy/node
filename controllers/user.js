const { models } = require("mongoose");
const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  //     const allDbUsers = await User.find({});

  //   const id = Number(req.params.id);
  //   const user = allDbUsers.find((user) => user.id === id);
  //   return res.json(user);
  const user = await User.findById(req.params.id);
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).send("user not found");
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
  // TOOD: Edit the user with id
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  // TOOD: Edit the user with id
  return res.json({ status: "success" });
}

async function handleCreateNewUser(req, res) {
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
    id: result._id,
  });
}
module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
