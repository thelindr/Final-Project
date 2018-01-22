import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid/v4"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/final-project-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

// const Schema = mongoose.Schema

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})

app.post("/user", (req, res) => {
  const { username } = req.body
  const password = bcrypt.hashSync(req.body.password)
  const user = new User({ username, password })

  user.save()
    .then(() => { res.status(201).send("User was created!") })
    .catch(err => { res.status(400).send(err) })
})

app.get("/users", (req, res) => {
  User.find().then(allUsers => {
    res.json(allUsers)
  })
})

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then(userInDatabase => {
    if (bcrypt.compareSync(req.body.password, userInDatabase.password)) {
      res.status(200).json({ message: "User is logged in", userId: userInDatabase.userId, accessToken: userInDatabase.accessToken })
    } else {
      res.status(401).json({ message: "Authentication fail" })
    }
  }).catch(err => {
    res.status(400).json({ message: "Incorrect username", error: err })
  })
})

const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user.accessToken === req.headers.token) {
        req.user = user
        next()
      } else {
        res.status(401).send("Unauthorized")
      }
    })
}
app.use("/users/:id", findUser)

app.get("/users/:id", (req, res) => {
  res.json({
    requestingUserId: req.params.id,
    requestToken: req.headers.token
  })
})

// Add more endpoints here!

app.listen(8080, () => console.log("API listening on port 8080!"))
