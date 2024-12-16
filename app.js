const express = require("express");
const connectDB = require('./config/db');
const roleRoutes = require("./routes/admin/roleRoutes");
const authRoutes = require("./routes/admin/auth");
const userRoutes = require("./routes/admin/userRoutes");

const app = express();
const PORT = 8000;



// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/role",roleRoutes);
app.use("/api/admin/users",userRoutes);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));