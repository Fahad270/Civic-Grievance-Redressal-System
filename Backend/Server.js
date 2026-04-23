const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
//User DB 
app.use("/api/users", userRoutes);

//All the routes are stored in the grievanceRputes file.~~~!~!~~!!~~
app.use("/api/grievances", require("./Routes/grievanceRoutes"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});