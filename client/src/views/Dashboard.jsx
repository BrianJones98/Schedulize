//Dependency imports
import React, {useState} from 'react';
import Calendar from 'react-calendar';

//Component imports
import Schedule from '../components/Schedule.jsx';

const Dashboard = props => {
    const [selectedDay, setSelectedDay] = useState(new Date());

    const onChange = (value, _event) => {
        setSelectedDay(value);
    }
    
    return (
        <div>
            <h1>Dashboard for COMPANY NAME</h1>
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