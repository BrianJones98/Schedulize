const ScheduleController = require("../controllers/Schedule.controller");

module.exports = app => {
    app.post("/api/schedules/create", ScheduleController.createSchedule);
    app.get("/api/schedules/find", ScheduleController.findSchedule);
    app.get("/api/schedules/", ScheduleController.findAll);
    app.delete("/api/schedules/:id", ScheduleController.deleteSchedule);
    app.put("/api/schedules/create-column/:id", ScheduleController.createColumn);
    app.put("/api/schedules/create-task/:id", ScheduleController.createTask);
}