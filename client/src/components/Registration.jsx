//Dependency imports
import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import styles from './style.module.css';

const Registration = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const valid = {
        color: "green"
    }
    const invalid = {
        color: "red"
    }

    const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]+)?$/;
    const pwLowerCase = /^(?=.*[a-z])/;
    const pwUpperCase = /^(?=.*[A-Z])/;
    const pwNumber = /^(?=.*[0-9])/;
    const pwSpecial = /^(?=.*\W)/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    const handleSubmit = event => {
        event.preventDefault();
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        axios.post("http://localhost:8000/api/users/register", user, {withCredentials: true})
            .then(_res => {
                navigate("/dashboard");
            }).catch(err => {
                const errResponse = err.response.data.errors;
                const errArray = [];
                for(const key in errResponse){
                    errArray.push(errResponse[key].message);
                }

                setErrors(errArray);
            })
    }

    return (
        <div className={styles.registration}>
            <h2>New here? Register for an account below!</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
    
                    <button>Register</button>
                    {
                    errors.map((err, idx) =>
                            <p key={idx}>{err}</p>
                        )
                }
                </form>
                <div>
                    <ul>
                        <li style={firstName.length > 0 ? valid : invalid}>First name is required</li>
                        <li style={lastName.length > 0 ? valid : invalid}>Last name is required</li>
                        <li 
                            style={emailRegex.test(email) && email.length > 0 ? valid : invalid}
                        >Valid email is required</li>
                        <li
                            style={passwordRegex.test(password) && password.length > 0 ? valid : invalid}
                        >
                            Password must:
                            <ul>
                                <li style={password.length >= 8 ? valid : invalid}>Contain at least 8 characters</li>
                                <li 
                                    style={pwLowerCase.test(password) && password.length > 0 ? valid : invalid}
                                >Contain at least one lowercase letter</li>
                                <li
                                    style={pwUpperCase.test(password) && password.length > 0 ? valid : invalid}
                                >Contain at least one uppercase letter</li>
                                <li
                                    style={pwNumber.test(password) && password.length > 0 ? valid : invalid}
                                >Contain at least one number</li>
                                <li
                                    style={pwSpecial.test(password) && password.length > 0 ? valid : invalid}
                                >Contain at least one special character</li>
                            </ul>
                        </li>
                        <li style={password === confirmPassword ? valid : invalid}>Passwords must match</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Registration;