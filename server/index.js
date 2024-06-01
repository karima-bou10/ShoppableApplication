const express = require("express");
const cors = require("cors");
const db = require("./models");
const Role = db.role;
const dbConfig = require("./config/db.config");

//Init App
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: "http://localhost:8082" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);
require("./routes/collection.routes")(app);
require("./routes/tag.routes")(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connectToDatabase();
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await db.mongoose.connect(
      `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successfully connected to MongoDB.");
    await initializeRoles();
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}

// Initialize roles in the database
async function initializeRoles() {
  const roles = ["user", "admin"];
  for (const roleName of roles) {
    try {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        await new Role({ name: roleName }).save();
        console.log(`Added '${roleName}' to roles collection.`);
      }
    } catch (error) {
      console.error(`Error adding '${roleName}' to roles collection:`, error);
    }
  }
}
