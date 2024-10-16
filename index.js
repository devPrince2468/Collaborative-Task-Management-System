const express = require("express");
const cors = require("cors");
const DB = require("./Utils/DB");
const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");

const PORT = process.env.PORT || 8080;

const app = express();

DB();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
