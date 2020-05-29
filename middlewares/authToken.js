if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.body.authorization
    if (!token) return res.status(401).send('Must send Authorization token')
    try {
        const result = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = JSON.parse(result.data)
    } catch (err) {
        return res.status(401).send('User Unauthorised')
    }
    next()
}