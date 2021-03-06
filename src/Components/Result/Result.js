import React, {memo} from 'react';
import classes from './Result.module.css';

const result = (props) => {

    return (
        <div className={classes.Results}>
            <p className={classes[props.classColor]}>{props.message}</p>
            <p>Correct answer:</p> 
            <p onClick={props.resultClicked}>{props.sentence}</p>
            <button type="button" onClick={props.restart}>Try again</button>
        </div>
    );
};

export default memo(result);