const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Company name is required"]
    },
    employerCode: {
        type: String,
        required: [true, "Employer code is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
            message: "Password must contain at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }
    }
}, {timestamps: true});

EmployerSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

EmployerSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords do not match");
    }
    next();
});

EmployerSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('Employer', EmployerSchema);