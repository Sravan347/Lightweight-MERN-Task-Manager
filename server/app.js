const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db");
const auth= require("./routes/authRoute");
const task= require("./routes/taskRoute");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth",auth );
app.use("/api/tasks",task);



const startServer = async () => {
  try {
    await connection(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
   
  }
};

startServer();
