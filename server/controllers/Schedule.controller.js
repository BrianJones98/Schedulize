const Schedule = require('../models/Schedule.model');

module.exports.createSchedule = (req, res) => {
    Schedule.create(req.body)
        .then(res => res.json({success: true}))
        .catch(err => res.json({error: err}));
}