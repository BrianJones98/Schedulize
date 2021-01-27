const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    date: String,
    employer: String,
    startTime: {
        type: Date,
        required: [true, "Please select a start time"]
    },
    endTime: {
        type: Date,
        required: [true, "Please select a end time"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Schedule', ScheduleSchema);