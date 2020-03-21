const jwt = require("jsonwebtoken")

function authenticate() {
	const authError = {
		message: "Invalid credentials",
	}
	
	return async (req, res, next) => {
		try {
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, "asdfjkl;qwertyuiopzxcvbnm", (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				req.token = decoded
				console.log(decoded)

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = authenticate