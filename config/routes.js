const { secret } = require("./../_secrets/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./../database/dbConfig");
const { authenticate } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);

          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
}

function login(req, res) {
  const creds = req.body;

  //find user
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      //check creds
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        //generate a token
        const token = generateToken(user);

        //attach that token to the response.
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "you shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
