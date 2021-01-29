//Dependency imports
import React from 'react';

const ColumnForm = props => {
    const {onSubmit} = props;
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="header" id="header" placeholder="Add a Column"/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default ColumnForm;