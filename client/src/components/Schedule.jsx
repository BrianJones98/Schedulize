//Dependency imports
import React, {useState, useEffect} from 'react';
import axios from 'axios';

//Component imports
import ScheduleForm from './subcomponents/ScheduleForm.jsx';

const Schedule = props => {
    const {date} = props;
    const [schedule, setSchedule] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const createDate = (timeString) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const time = timeString.split(':');

        return new Date(year, month, day, time[0], time[1], 0);
    }

    const createSchedule = event => {
        event.preventDefault();
        const schedule = {
            date: date.valueOf(),
            start: createDate(event.target.startTime.value),
            end: createDate(event.target.endTime.value),
            intervalType: event.target.intervalType.value,
            interval: parseInt(event.target.interval.value)
        }
        console.log(schedule);

        axios.post("http://localhost:8000/api/schedules/create", schedule, {withCredentials: true})
            .then(res => {
                setSchedule(res.data);
            }).catch(console.log);
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/schedules/find", {
            withCredentials: true,
            params: {date: date.valueOf()}
        })
            .then(res => {
                setSchedule(res.data);
                setLoaded(true);
            }).catch(err =>{
                console.log(err);
                setLoaded(true);
            })
    }, [date]);

    if(!loaded) return <h1>Loading...</h1>

    if(loaded && !schedule){
        return (
            <ScheduleForm
                date={date}
                onSubmit={createSchedule}
            />
        );
    }

    return (
        <div>
            <h1>Schedule for {date.toLocaleDateString()}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schedule.intervals.map((interval, idx) =>{
                            return (
                                <tr key={idx}>
                                    <td>{interval}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;