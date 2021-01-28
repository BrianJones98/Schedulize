//Dependency imports
import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const Registration = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    
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
        <div>
            <h1>New here? Register for an account below!</h1>
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
                <div>
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
                </div>

                <button>Register</button>
            </form>
            <div>
                <ul>
                    <li>First name is required</li>
                    <li>Last name is required</li>
                    <li>Email is required</li>
                    <li>
                        Password must:
                        <ul>
                            <li>Contain at least 8 characters</li>
                            <li>Contain at least one lowercase letter</li>
                            <li>Contain at least one uppercase letter</li>
                            <li>Contain at least one number</li>
                            <li>Contain at least one special character</li>
                        </ul>
                    </li>
                    <li>Passwords must match</li>
                </ul>
            </div>
            {
                errors.map((err, idx) =>
                        <p key={idx}>{err}</p>
                    )
            }
        </div>
    );
}

export default Registration;