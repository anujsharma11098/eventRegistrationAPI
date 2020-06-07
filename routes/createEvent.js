const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const event = require('../models/createEvent')

const authUser = require('../middlewares/authUser')


router.post('/', authUser, async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { eventName, venue, date, eventType, payment } = req.body
    try {
        await event.create({
            userId: req.user._id, eventName, date, venue, eventType, payment
        })
        res.status(201).json({ status: 201, message: 'Event created Successfully!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.get('/', async (req, res) => {
    let events
    events = await event.aggregate([

         {
            $sort: {
                createdAt: -1
            }
        }
    ])

    res.json({ status: 200, events })
})

router.get('/bhavit', async (req, res) => {
    let events
    events = await event.aggregate([

         {
            $sort: {
                createdAt: -1
            }
        }
    ])

    res.json( events )
})

module.exports = router