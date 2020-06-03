const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const interest = require('../models/interested')
const authUser = require('../middlewares/authUser')

router.post('/', async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { eventId, fullName, email, registrationType, phoneNumber, ticketCount } = req.body
    try {
        await interest.create({
            eventId, fullName, email, registrationType, phoneNumber, ticketCount
        })
        res.status(201).json({ status: 201, message: '  Successfully! Registered in the Event ' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.get('/:id', authUser, async (req, res) => {
    let events


    events = await interest.find({
        eventId: req.params.id
    })
    res.json({ status: 200, events })
})

module.exports = router