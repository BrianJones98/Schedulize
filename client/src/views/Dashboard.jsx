//Dependency imports
import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import {navigate} from '@reach/router';

//Component imports
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

    if(!loaded) return <h1>Loading...</h1>
    
    return (
        <div>
            <h1>Dashboard for {user.firstName}</h1>
            <div>
                <Calendar
                    onChange={onChange}
                    value={selectedDay}
                />
            </div>
            <Schedule
                date={selectedDay}
            />
        </div>
    );
}

export default Dashboard;