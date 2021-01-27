//Dependency imports
import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import {navigate} from '@reach/router';

//Component imports
import Schedule from '../components/Schedule.jsx';

const Dashboard = props => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [employer, setEmployer] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/employers/placeholder")
        .then(res => {
            setEmployer(res.data);
            setLoaded(true);
        }).catch(() => navigate("/"));
    }, []);

    const onChange = (value, _event) => {
        setSelectedDay(value);
    }

    if(!loaded) return <h1>Loading...</h1>
    
    return (
        <div>
            <h1>Dashboard for {employer.companyName}</h1>
            <div>
                <Calendar
                    onChange={onChange}
                    value={selectedDay}
                />
            </div>
            <Schedule
                date={selectedDay.toLocaleDateString()}
            />
        </div>
    );
}

export default Dashboard;