const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {origin:"http://localhost:8081"}

app.use(cors(corsOptions))

// parse request of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

const db = require("./app/models")
// const tutorialModel = require('./models/tutorial.model')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch( err => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })

// simple route
// app.get('/',(req,res) => {
//     res.json({ message:"Welcome to lanre app."})
// })

require('./app/routes/tutorial.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`)
})