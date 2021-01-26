//Dependency imports
import React from 'react';

//Component imports
import Login from '../components/Login.jsx';
import Register from '../components/registration/Register.jsx';

const Index = props => {
    return (
        <div>
            <Login/>
            <Register/>
        </div>
    );
}

export default Index;