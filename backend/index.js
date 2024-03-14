const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());
app.listen(4000, () => console.log("SERVER RUNNING ON 4000"));

// Signin api
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  // Query to retrieve user by email
  const getUserQuery = `SELECT * FROM vwuser WHERE email = '${email}';`;

  try {
    const userResult = await pool.query(getUserQuery);

    if (userResult.rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const storedHashedPassword = userResult.rows[0].password;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Return user data upon successful login
    const userData = {
      id: userResult.rows[0].id,
      name: userResult.rows[0].name,
      email: userResult.rows[0].email,
      city: userResult.rows[0].city,
      role: userResult.rows[0].role,
    };

    res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
