//Dependency imports
import React from 'react';
import styles from './style.module.css';

const TaskForm = props => {
    const {intervalIndex, columnIndex, onSubmit} = props;
    
    return (
        <div className={styles.taskForm}>
            <form onSubmit={onSubmit}>
                <input type="text" name="task" id="task" placeholder="Task Name"/>
                <input type="number" name="duration" id="duration" placeholder="Duration"/>
                <select name="durationType" id="durationType">
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                </select>
                <input type="hidden" name="intervalIndex" value={intervalIndex}/>
                <input type="hidden" name="columnIndex" value={columnIndex}/>

                <button>Add</button>
            </form>
        </div>
    );
}

export default TaskForm;