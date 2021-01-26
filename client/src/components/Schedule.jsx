//Dependency imports
import React from 'react';

const Schedule = props => {
    const {date} = props;
    
    return (
        <div>
            <h1>Schedule for {date}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Employee</th>
                        <th>Employee</th>
                        <th>Employee</th>
                        <th>Employee</th>
                        <th>Employee</th>
                        <th>Employee</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1:00</th>
                        <td>Task</td>
                        <td>Task</td>
                        <td>Task</td>
                        <td>Task</td>
                        <td>Task</td>
                        <td>Task</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;