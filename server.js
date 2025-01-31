const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");



dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/login", require("./routes/authRoutes/adminRoutes"));
app.use("/api", require("./routes/protectedRoutes/protectedRoutes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
