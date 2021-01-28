const Schedule = require('../models/Schedule.model');
const jwt = require('jsonwebtoken');

function generateIntervals(start, end, intervalType, interval){
    const startHour = start.getHours();
    const startMinute = start.getMinutes();
    
    const endHour = end.getHours();
    const endMinute = end.getMinutes();

    let intervals = [];

    if(startHour > endHour) throw new Error("Start time cannot exceed end time");
    if(interval < 0) throw new Error("Interval cannot be negative");
    
    if(intervalType === "hours"){
        let currentHour = startHour;

        while(currentHour <= endHour){
            intervals.push(`${currentHour}:${(endMinute < 10 ? '0' : '') + endMinute}`)
            currentHour += interval;
        }
    } else{
        let currentHour = startHour;
        let currentMinute = startMinute;
        while(currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)){
            intervals.push(`${currentHour}:${(currentMinute < 10 ? '0' : '') + currentMinute}`);
            
            currentMinute += interval;
            
            if(currentMinute >= 60){
                currentHour++;
                currentMinute -= 60;
            }
        }
    }

    return intervals;
}

module.exports.createSchedule = (req, res) => {
    const {date, start, end, intervalType, interval} = req.body;
    const creatorId = jwt.decode(req.cookies.token).id;

    rcStart = new Date(start);
    rcEnd = new Date(end);

    const schedule = {
        date: date,
        creatorId: creatorId,
        startTime: rcStart,
        endTime: rcEnd,
        intervals: generateIntervals(rcStart, rcEnd, intervalType, interval),
        columns: []
    }

    Schedule.create(schedule)
        .then(schedule => res.json(schedule))
        .catch(err => res.json({error: err}));
}

module.exports.findSchedule = (req, res) => {
    const {date} = req.query;
    
    Schedule.findOne({creatorId: jwt.decode(req.cookies.token).id, date: date})
        .then(schedule => res.json(schedule))
}

module.exports.findAll = (req, res) => {
    Schedule.find()
        .then(schedules => res.json(schedules))
        .catch(err => res.json(err));
}

module.exports.deleteSchedule = (req, res) => {
    Schedule.findByIdAndDelete(req.params.id)
        .then(res => res.json({success: true}))
        .catch(err => res.json(err));
}