const mongoose = require('mongoose')

const InterestedSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    registrationType: {
        type: String,
        required: true
    },
    ticketCount: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Interested', InterestedSchema)