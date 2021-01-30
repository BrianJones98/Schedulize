//Dependency imports
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import styles from './style.module.css';

//Component imports
import Calendar from 'react-calendar';
import Schedule from '../components/Schedule.jsx';

const Dashboard = props => {
    const [selectedDay, setSelectedDay] = useState(new Date(
        new Date().getFullYear(), 
        new Date().getMonth(), 
        new Date().getDate()
    ));
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/find/cookie", {withCredentials: true})
        .then(res => {
            setUser(res.data);
            setLoaded(true);
        }).catch(() => navigate("/"));
    }, []);

    const onChange = (value, _event) => {
        setSelectedDay(value);
    }

    const logout = event => {
        event.preventDefault();
        
        axios.delete("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(_res => {
                navigate("/");
            });
    }

    if(!loaded) return <h1>Loading...</h1>
    
    return (
        <div>
            <div className={styles.dashboardHeader}>
                <h1>Dashboard for {user.firstName}</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <div className={styles.dashboardContent}>
                <Calendar
                    onChange={onChange}
                    value={selectedDay}
                    className={styles.calendar}
                />
                <Schedule
                    date={selectedDay}
                />
            </div>
        </div>
    );
}

export default Dashboard;