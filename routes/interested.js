const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const interest = require('../models/interested')
const event = require('../models/createEvent')
const authUser = require('../middlewares/authUser')


router.post('/', async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { eventId, fullName, email, registrationType, phoneNumber, ticketCount } = req.body
    try {
       let result= await interest.create({
            eventId, fullName, email, registrationType, phoneNumber, ticketCount
        })
        res.status(201).json({ status: 201, message: '  Successfully! Registered in the Event ' , result})
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.get('/:id',authUser, async (req, res) => {
    let events


    events = await interest.find({
        eventId: req.params.id
    })
    res.json({ status: 200, events })
})


router.get('/analysis/:id',authUser, async (req, res) => {
    const event1= await event.findById(req.params.id)
    let events

    events = await interest.find({
        eventId: req.params.id
    })

    let SELF = events.filter(e => e.registrationType === 'SELF').length
    let GROUP = events.filter(e => e.registrationType === 'GROUP').length
    let CORPORATE = events.filter(e => e.registrationType === 'CORPORATE').length
    let OTHER = events.filter(e => e.registrationType === 'OTHER') .length
    console.log(SELF)
    console.log(GROUP)
    console.log(CORPORATE)
    console.log(OTHER)

    res.json({ status: 200, SELF,GROUP,CORPORATE,OTHER })
})
module.exports = router