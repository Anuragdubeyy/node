const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

// REST API- CRUD // for all users
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// for user id 1
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

// routes.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//       <ul>
//       ${allDbUsers.map(
//         (users) => `<li>${users.first_name} - ${users.email}</li>`
//       )}
//       </ul>`;
//   res.send(html);
// });

// ROUTE PUSH

// users.push({ ...body, id: users.length + 1 });
// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//   return res.status(201).res.json({ status: "success", id: users.length });
// });

// app.patch("/api/users/:id", (req, res) => {
//     // TOOD: Edit the user with id
//     return res.json({ status:"pending"});
// })

// app.delete("/api/users/:id", (req, res) => {
//     // TOOD: Edit the user with id
//     return res.json({ status:"pending"});
// })
