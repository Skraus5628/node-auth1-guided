const express = require("express")
const Users = require("../users/users-model")
const bcrypt = require('bcryptjs')
const { sessions,restrict } = require('../middleware/restrict')

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		// const hash = await bcrypt.hash(password, 14)

		// since bcrypt hashes generate different results due to salting,
		// we rely on the internal functions to compare hashes rather than doing it with 
		// !==user.password

		const passwordValid = await bcrypt.compare(password, user.password)

		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// const authToken = Math.random()
		// sessions[authToken] = user.id

		// res.setHeader("Set-Cookie", `token=${authToken}; Path=/`)
		req.session.user = user 
		// same thing as above, but using express-session

		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", restrict(), (req,res, next) =>{
	req.session.destroy((err) =>{
		if (err) {
			next(err)
		} else {
			res.json({
				message: "Successfully logged out"
			})
		}
	})
})

// function validateUser(req, res, next){
// 	const username = req.headers.username
// 	const password = req.headers.password

// 	const user = await Users.findBy({ username, password }).first()
// 	// req.headers.username
// 	// req.headers.password
	
// 	if (!user || !passwordValid){
// 		return res.status(401).json({
// 			message: "invalid credentials",
// 		})
// 	}

// 	else {
// 		return next()
// 	}
// }




module.exports = router
