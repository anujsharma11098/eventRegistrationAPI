const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    }


}, {
    timestamps: true
})

module.exports = mongoose.model('Event', EventSchema)