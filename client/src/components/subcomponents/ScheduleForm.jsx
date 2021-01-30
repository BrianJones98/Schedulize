//Dependency imports
import React from 'react';
import styles from './style.module.css';

const ScheduleForm = props => {
    const {date, onSubmit} = props;
    
    return (
        <div className={styles.scheduleForm}>
            <h2>You don't seem to have a schedule for {date.toLocaleDateString()}. Create one below!</h2>
            
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input type="time" name="startTime" id="startTime"/>
                </div>

                <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input type="time" name="endTime" id="endTime"/>
                </div>

                <div>
                    <input type="number" name="interval" id="interval" placeholder="Interval"/>
                    <select name="intervalType" id="intervalType">
                        <option value="hours">Hours</option>
                        <option value="minutes">Minutes</option>
                    </select>
                </div>

                <button>Create</button>
            </form>
        </div>
    );
}

export default ScheduleForm;