const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    date: String,
    creatorId: String,
    startTime: {
        type: Date,
        required: [true, "Please enter a start time"]
    },
    endTime: {
        type: Date,
        required: [true, "Please enter an end time"]
    },
    intervals: Array,
    intervalData: Object,
    columns: Array
}, {timestamps: true, minimize: false})

module.exports = mongoose.model('Schedule', ScheduleSchema);