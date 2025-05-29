const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");


const app = express();
app.use(cors());
app.use(express.json());

// TODO: implement these in a production viable way
const users = [];
const JWT_SECRET = "tbd";


app.post("/api/auth/signup", async (request, response) => {
  const { email, password } = request.body;

  if (users.find(u => u.email === email)) {
    return response.status(400).json({ error: "User already exists" });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  users.push({ email, password: hashed_password });

  response.status(201).json({ message: "User registered successfully" });
});


app.post("/api/auth/login", async (request, response) => {
  const { email, password } = request.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return response.status(400).json({ error: "Invalid credentials" });
  }

  const is_password_match = await bcrypt.compare(password, user.password);

  if (!is_password_match) {
    return response.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email }, JWT_SECRET, { expiresIn: "1h" }
  );

  response.json({ token });
});


function middlewareAuthenticateToken(request, response, next) {
  const authorization_header = request.headers["authorization"];
  const token = authorization_header && authorization_header.split(" ")[1];

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      return response.status(403).json({ error: "Invalid token" });
    }

    request.user = user;

    next();
  });
}


app.get("/api/profile", middlewareAuthenticateToken, (request, response) => {
  response.json({
    message: `Welcome ${request.user.email}! This is your profile.`,
  });
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
