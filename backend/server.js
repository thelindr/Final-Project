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
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => uuid()
  },
  bodyweight: {
    type: Number
  },
  dailydose: {
    type: Number
  },
  goaldose: {
    type: Number
  },
  dayspassed: {
    type: Number,
    default: 0
  },
  dosetaken: {
    type: Number,
    default: 0
  }
})

// const Userdata = mongoose.model("Userdata", {
//   weight: {
//     type: Number,
//     required: true
//   },
//   dailydose: {
//     type: Number,
//     required: true
//   },
//   goaldose: {
//     type: Number,
//     required: true
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User"
//   }
// })

app.post("/users", (req, res) => {
  const { username } = req.body
  const { bodyweight } = req.body
  const { dailydose } = req.body
  const { goaldose } = req.body
  const password = bcrypt.hashSync(req.body.password)
  const user = new User({
    username, password, bodyweight, dailydose, goaldose
  })

  user.save()
    .then(() => { res.status(201).send("User was created!") })
    .catch(err => { res.status(400).send(err) })
})

app.get("/users", (req, res) => {
  User.find().then(allUsers => {
    res.json(allUsers)
  })
})

// app.post("/userdata", (req, res) => {
//   const userdata = new Userdata(req.body)
//
//   userdata.save()
//     .then(() => { res.status(201).send("Userdata was saved!") })
//     .catch(err => { res.status(400).send(err) })
// })
//
// app.get("/userdata", (req, res) => {
//   Userdata.find().then(allUserdata => {
//     res.json(allUserdata)
//   })
// })

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json(user)
      } else {
        res.status(401).json({ message: "Authentication fail" })
      }
    })
})
//
// const findUser = (req, res, next) => {
//   User.findById(req.params.id)
//     .then(user => {
//       if (user.accessToken === req.headers.accessToken) {
//         req.user = user
//         next()
//       } else {
//         res.json({ message: "error" })
//       }
//     })
// }

const findUser = (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(user => {
    if (user.accessToken === req.headers.token) {
      req.bodyweight = user.bodyweight
      req.dailydose = user.dailydose
      req.goaldose = user.goaldose
      req.dayspassed = user.dayspassed
      req.dosetaken = user.dosetaken
      next()
    } else {
      res.json({ message: "Incorrect accessToken" })
    }
  }).catch(err => {
    res.status(400).json({ message: "Incorrect userId", error: err })
  })
}

app.put("/users/:id", (req, res) => {
  const condition = { _id: req.params.id }
  User.update(condition, req.body)
    .then(() => { res.status(201).send("User data updated") })
    .catch(err => { res.status(400).send(err) })
})

app.use("/users/:id", findUser)

app.get("/users/:id", (req, res) => {
  res.status(200).json({
    bodyweight: req.bodyweight,
    dailydose: req.dailydose,
    goaldose: req.goaldose,
    dayspassed: req.dayspassed,
    dosetaken: req.dosetaken
  })
})

// app.post("/users/:id", (req, res) => {
//   // const condition = { _id: req.params.id }
//   User.save(req.body)
//     .then(() => { res.status(201).send("User updated in mongo") })
//     .catch(err => { res.status(400).send(err) })
// })

// Add more endpoints here!

app.listen(8080, () => console.log("API listening on port 8080!"))
