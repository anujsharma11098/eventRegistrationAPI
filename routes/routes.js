const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ status: 200, message: 'Server Up and Running...' })
})

router.use('/api/user', require('./user'))
router.use('/api/eventRegistration', require('./eventRegistration'))


module.exports = router