const database = require("./database");

const getUser = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database.query("INSERT INTO USERS SET ?", req.body).then(([result]) => {
    if (result.affectedRows > 0) {
      res
        .status(201)
        .send(`Your user is created successfully with id ${result.insertId}`);
    } else {
      res.status(403).send("your request is forbidden");
    }
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update users set firstname=?,lastname=?, email=?,city=?,language=? where id=?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([results]) => {
      console.log(results);
      if (results.affectedRows > 0) {
        res.status(204).send("User updated");
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

module.exports = {
  getUser,
  getUserById,
  postUser,
  updateUser,
};
