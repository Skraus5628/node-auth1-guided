const express = require("express")
const helmet = require("helmet")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")
const dbConfig = require("./database/config")

const server = express()
const port = process.env.PORT || 5000

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(session({
	// overwrites the default cookie name, hides our stack better
	name: "token",
	// avoid recreating sessions that have not changed 
	resave: false,
	// GDPR laws against setting cookies automatically
	saveUninitialized: false,
	// cryptographically sign the cookie
	secret: process.env.COOKIE_SECRET || "secret",
	// expire the cookie after 15 seconds
	cookie: {
		// maxAge: 15 * 1000,
		httpOnly: true,
	},
	store: new KnexSessionStore({
		// if session table doesn't exist, create it automatically
		createTable: true,
		// configured instance of knex
		knex: dbConfig,

	})

}))

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
