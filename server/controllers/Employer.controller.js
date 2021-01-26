const Employer = require('../models/Employer.model');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
    Employer.create(req.body)
        .then(employer => {
            const employerToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("employertoken", employerToken, secret, {
                    httpOnly: true
                })
                .json({msg: "success!", employer});
        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = async (req, res) => {
    const employer = await Employer.findOne({email: req.body.email});
    if(employer === null){
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, employer.password);

    if(!correctPassword){
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({
        id: employer._id
    }, process.env.SECRET_KEY);

    res
        .cookie("userToken", userToken, secret, {
            httpOnly: true
        })
        .json({msg: "success!"});
}

module.exports.logout = (_req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200);
}

module.exports.findAll = (_req, res) => {
    Employer.find()
        .then(employers => res.json(employers))
        .catch(err => res.json(err));
}