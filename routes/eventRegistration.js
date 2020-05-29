const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const event = require('../models/eventRegistration')
const authToken = require('../middlewares/authToken')
const authUser = require('../middlewares/authUser')


router.post('/', authToken, async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { fullName, phoneNumber, email, registrationType, ticketCount } = req.body
    try {
        await event.create({
            userId: req.user._id, fullName, phoneNumber, email, registrationType, ticketCount
        })
        res.status(201).json({ status: 201, message: 'Event Registered Successfully!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.get('/', authUser, async (req, res) => {
    let events
    events = await event.aggregate([

        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userInfo'
            }
        }, {
            $sort: {
                createdAt: -1
            }
        }
    ])

    res.json({ status: 200, events })
})

module.exports = router