const express = require('express')
var cors = require('cors');

// const path = require('path')
// const mysql = require('mysql')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('config')
const PORT = config.SERVER_PORT
// const connection = require('./database/database')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const organiserRoute = require('./routes/organiser')
const eventRoute = require('./routes/event')
const subsRoute = require('./routes/subs')
const commentRoute = require('./routes/comment')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));


app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/organiser", organiserRoute)
app.use("/api/event", eventRoute)
app.use("/api/subs", subsRoute)
app.use("/api/comment", commentRoute)

app.listen(PORT, (err) => err ? console.log(err) : console.log(`[server] Server running at http://localhost:${PORT}/`))