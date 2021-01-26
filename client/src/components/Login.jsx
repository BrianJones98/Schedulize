//Dependency imports
import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

const Login = props => {
    const [errors, setErrors] = useState([]);
    
    const onSubmit = event => {
        event.preventDefault();
        const credentials = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        axios.post("http://localhost:8000/api/employers/login", credentials)
            .then(_response => {
                navigate("/dashboard")
            }).catch(err => console.log(err));
    }
    
    return (
        <div>
            <h2>Have an account? Login below!</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" id="email" placeholder="Email"/>
                <input type="password" name="password" id="password" placeholder="Password"/>
                <button>Login</button>
            </form>
            {
                errors.map((err, idx) => {return (
                    <p key={idx}>{err}</p>
                )})
            }
        </div>
    );
}

export default Login;