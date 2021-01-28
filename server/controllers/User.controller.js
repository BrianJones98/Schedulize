const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const token = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("token", token, {
                    httpOnly: true
                })
                .json({msg: "success!"});
        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const user = await User.findOne({email: email});

        if(user === null){
            throw new Error('Invalid email or password');
        }

        const result = await bcrypt.compare(password, user.password);

        if(result === false){
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
    
        res
            .cookie("token", token, {
                httpOnly: true
            })
            .json({msg: "success!"});
    } catch(err){
        res
            .status(400)
            .json({message: "Invalid email or password"});
    }
}

module.exports.logout = (_req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
}

module.exports.findAll = (_req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
}

module.exports.findUser = (req, res) => {
    User.findById(jwt.decode(req.cookies.token).id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

module.exports.deleteUser = (req, res) => {
    const {id} = req.params;
    User.findByIdAndDelete(id)
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
}