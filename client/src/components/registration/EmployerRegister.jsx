//Dependency imports
import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const EmployerRegister = props => {
    const [companyName, setCompanyName] = useState("");
    const [employerCode, setEmployerCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = event => {
        event.preventDefault();
        const employer = {
            companyName: companyName,
            employerCode: employerCode,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        axios.post("http://localhost:8000/api/employers/register", employer, {withCredentials: true})
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
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="companyName" 
                    id="companyName" 
                    placeholder="Company Name"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                />
                <input 
                    type="text" 
                    name="employerCode" 
                    id="employerCode" 
                    placeholder="Employer Code"
                    value={employerCode}
                    onChange={e => setEmployerCode(e.target.value)}
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
                    <li>Company name is required</li>
                    <li>Employer code is required</li>
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

export default EmployerRegister;