//Dependency imports
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './style.module.css';

//Subcomponent imports
import ScheduleForm from './subcomponents/ScheduleForm.jsx';
import ColumnForm from './subcomponents/ColumnForm.jsx';
import TaskForm from './subcomponents/TaskForm.jsx';

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

    const createColumn = event => {
        event.preventDefault();
        const column = {
            header: event.target.header.value,
            items: {}
        }
        console.log(column);

        axios.put(`http://localhost:8000/api/schedules/create-column/${schedule._id}`, column)
            .then(res => {
                setSchedule(res.data);
            }).catch(console.log);
    }

    const createTask = event => {
        event.preventDefault();
        const data = {
            task: event.target.task.value,
            duration: event.target.duration.value,
            durationType: event.target.durationType.value,
            intervalIndex: event.target.intervalIndex.value,
            columnIndex: event.target.columnIndex.value,
            intervalType: schedule.intervalData.type
        }
        console.log(data);

        axios.put(`http://localhost:8000/api/schedules/create-task/${schedule._id}`, data)
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
        <div className={styles.schedule}>
            <h1>Schedule for {date.toLocaleDateString()}</h1>
            <table cellSpacing={0} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Time</th>
                        {
                            schedule.columns.map((column, idx) =>{
                                return (
                                    <th key={idx}>{column.header}</th>
                                );
                            })
                        }
                        <th>
                            <ColumnForm
                                onSubmit={createColumn}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schedule.intervals.map((interval, idx) =>{
                            return (
                                <tr key={idx}>
                                    <th>{interval}</th>
                                    {
                                        schedule.columns.map((column, colIdx) =>{
                                            if (column.items[idx]) return <td key={colIdx}>{column.items[idx]}</td>
                                            return (
                                                <td key={colIdx}>
                                                    <TaskForm 
                                                        intervalIndex={idx}
                                                        columnIndex={colIdx}
                                                        onSubmit={createTask}
                                                    />
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;