//Dependency imports
import React from 'react';

const EmployeeRegister = props => {
    return (
        <div>
            <form>

                <div>
                    <input type="text" name="firstName" id="firstName" placeholder="First Name"/>
                    <input type="text" name="lastName" id="lastName" placeholder="Last Name"/>
                </div>
                
                <input type="text" name="email" id="email" placeholder="Email"/>
                <input type="text" name="employerCode" id="employerCode" placeholder="Employer Code"/>

                <div>
                    <input type="password" name="password" id="password" placeholder="Password"/>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"/>
                </div>

                <button>Register</button>
            </form>
            <div>
                <ul>
                    <li>First Name is required</li>
                    <li>Last Name is required</li>
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
        </div>
    );
}

export default EmployeeRegister;