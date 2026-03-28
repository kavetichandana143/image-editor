const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// 🔥 VERY IMPORTANT (static folder)
app.use(express.static(path.join(__dirname, "public")));

// 👉 Default route (login page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 👉 Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.redirect("http://localhost:3000/editor.html"); // MUST have /
  } else {
    res.send("Invalid Login");
  }
});

// 👉 Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});