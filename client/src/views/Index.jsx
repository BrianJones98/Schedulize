//Dependency imports
import React from 'react';
import styles from './style.module.css';

//Component imports
import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

const Index = props => {
    return (
        <div className={styles.indexContainer}>
            <Login/>
            <Registration/>
        </div>
    );
}

export default Index;