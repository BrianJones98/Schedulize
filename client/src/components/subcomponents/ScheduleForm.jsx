//Dependency imports
import React from 'react';

const ScheduleForm = props => {
    const {date, onSubmit} = props;
    
    return (
        <div>
            <h2>You don't seem to have a schedule for {date.toLocaleDateString()}. Create one below!</h2>
            
            <form onSubmit={onSubmit}>
                <label htmlFor="startTime">Start Time:</label>
                <input type="time" name="startTime" id="startTime"/>

                <label htmlFor="endTime">End Time:</label>
                <input type="time" name="endTime" id="endTime"/>

                <input type="number" name="interval" id="interval" placeholder="Interval"/>
                <select name="intervalType" id="intervalType">
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                </select>

                <button>Create</button>
            </form>
        </div>
    );
}

export default ScheduleForm;