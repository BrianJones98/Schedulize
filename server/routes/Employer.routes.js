const EmployerController = require('../controllers/Employer.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/employers/register', EmployerController.register);
    app.post("/api/employers/login", EmployerController.login);
    app.get('/api/employers', authenticate, EmployerController.findAll);
}