const EmployerController = require('../controllers/Employer.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/employers/register', EmployerController.register);
    app.post("/api/employers/login", EmployerController.login);
    app.delete("/api/employers/logout", EmployerController.logout);
    app.get('/api/employers', authenticate, EmployerController.findAll);
    app.get('/api/employers/placeholder', authenticate, EmployerController.findEmployer);
}