const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Post, Comment } = require("./models");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    req.user = {
      /* Mock user data here */
    };
    return next();
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const user = jwt.verify(token, process.env.APP_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user;
      return { req, user };
    },
    formatError: (error) => {
      return error;
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  });

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  db.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // Start the server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

startServer();

// export NODE_ENV=development
// set NODE_ENV=development
