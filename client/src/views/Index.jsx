//Dependency imports
import React from 'react';

//Component imports
import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

const Index = props => {
    return (
        <div>
            <Login/>
            <hr/>
            <Registration/>
        </div>
    );
}

export default Index;