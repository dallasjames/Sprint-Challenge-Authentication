const userModel = require("../users/user-model")

module.exports = () => {
    return (req, res, next) => {
        if (!req.session.token) {
            return res.status(403).json({
              message: "you shall not pass"
            })
        }
        next()
    }
}
