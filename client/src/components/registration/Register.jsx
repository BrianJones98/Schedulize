//Dependency imports
import React, {useState} from 'react';

//Component imports
import EmployerRegister from './EmployerRegister.jsx';
import EmployeeRegister from './EmployeeRegister.jsx';

const Register = props => {
    const [registrationType, setRegistrationType] = useState("")
    
    let selectedForm;

    if(registrationType === "Employer"){
        selectedForm = <EmployerRegister/>
    } else if(registrationType === "Employee"){
        selectedForm = <EmployeeRegister/>
    }

    return (
        <div>
            <h2>New here? Select an account type below to register.</h2>
            <label htmlFor="regType">I am an: </label>
            <select 
                name="regType" 
                id="regType"
                onChange={e => setRegistrationType(e.target.value)}
                value={registrationType}
            >
                <option disabled hidden value="">Please select</option>
                <option value="Employee">Employee</option>
                <option value="Employer">Employer</option>
            </select>

            {selectedForm}
        </div>
    );
}

export default Register;