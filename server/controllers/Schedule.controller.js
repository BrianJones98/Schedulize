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

function determineColumnSpan(duration, durationType, interval, intervalType){
    
    if(durationType === "hours"){
        if(intervalType === "hours"){
            return duration/interval;
        } else{
            return (duration*60)/interval
        }
    } else{
        if(intervalType === "minutes"){
            return duration/interval;
        } else{
            return (duration/(interval * 60))
        }
    }
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
        intervalData: {type: intervalType, interval: interval},
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

module.exports.createColumn = (req, res) => {
    const {id} = req.params;
    
    Schedule.findByIdAndUpdate(id, {$push: {columns: req.body}}, {new: true})
        .then(schedule => res.json(schedule))
        .catch(err => res.json(err));
}

module.exports.createTask = (req, res) => {
    const {task, duration, durationType, intervalIndex, columnIndex, intervalType} = req.body;
    const {id} = req.params;

    Schedule.findById(id)
        .then(schedule =>{
            //Column that the form was submitted in
            const targetColumn = schedule.columns[columnIndex];

            //Determine how many columns to fill with this task based on duration provided by user
            const loopEnd = determineColumnSpan(duration, durationType, schedule.intervalData.interval, intervalType);
            for(let i = 0; i < loopEnd; i++){
                targetColumn.items[parseInt(intervalIndex) + i] = task;
            }

            //replace the old schedule with the modified one
            Schedule.findByIdAndUpdate(id, schedule, {new: true})
                .then(schedule => res.json(schedule))
                .catch(err => res.json(err));
            })
}

module.exports.deleteSchedule = (req, res) => {
    Schedule.findByIdAndDelete(req.params.id)
        .then(res => res.json({success: true}))
        .catch(err => res.json(err));
}




//! Won't be used in final version
module.exports.findAll = (req, res) => {
    Schedule.find()
        .then(schedules => res.json(schedules))
        .catch(err => res.json(err));
}