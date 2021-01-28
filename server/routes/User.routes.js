const UserController = require('../controllers/User.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/users/register', UserController.register);
    app.post("/api/users/login", UserController.login);
    app.delete("/api/users/logout", UserController.logout);
    app.get('/api/users', authenticate, UserController.findAll);
    app.get('/api/users/find/cookie', authenticate, UserController.findUser);
    app.delete("/api/users/:id", UserController.deleteUser);
}