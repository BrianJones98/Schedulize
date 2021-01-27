const Employer = require('../models/Employer.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    Employer.create(req.body)
        .then(employer => {
            const token = jwt.sign({
                id: employer._id
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
        const employer = await Employer.findOne({email: email});

        if(employer === null){
            throw new Error('Invalid email or password');
        }

        const result = await bcrypt.compare(password, employer.password);

        if(result === false){
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({
            id: employer._id
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
    Employer.find()
        .then(employers => res.json(employers))
        .catch(err => res.json(err));
}

module.exports.findEmployer = (_req, res) => {
    res.json({companyName: "PLACEHOLDER"});
}