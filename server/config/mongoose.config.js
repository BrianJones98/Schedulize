const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/scheduler_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Error connecting to database:", err));