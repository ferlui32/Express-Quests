const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 6000;



const welcome = (req, res) => {
  res.send("Welcome to my favorite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandler = require("./usersHandler")



const database = require("./database");

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
// the public routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", usersHandler.getUser);
app.get("/api/users/:id", usersHandler.getUserById)

app.post("/api/login", usersHandler.getUserByEmailWithPasswordAndPassToNext,
verifyPassword
);
app.post("/api/users", hashPassword, usersHandler.postUser);

// routes to protect
app.use(verifyToken)

app.put("/api/users/:id", hashPassword, usersHandler.updateUser);

app.post("/api/movies", movieHandlers.postMovie);

app.put("/api/movies/:id",movieHandlers.updateMovie)

app.delete("/api/movies/:id",movieHandlers.deleteMovie)
app.delete("/api/users/:id",usersHandler.deleteUser)

app.post("/api/movies", movieHandlers.postMovie);