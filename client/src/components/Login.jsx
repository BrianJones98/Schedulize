//Dependency imports
import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

const Login = props => {
    const [error, setError] = useState("");
    
    const onSubmit = event => {
        event.preventDefault();
        const credentials = {
            email: event.target.email.value,
            password: event.target.password.value
        }


        axios.post("http://localhost:8000/api/employers/login", credentials, {withCredentials: true})
            .then(_response => {
                navigate("/dashboard")
            }).catch(_err => setError("Invalid username or password"));
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
                error && <p>{error}</p>
            }
        </div>
    );
}

export default Login;