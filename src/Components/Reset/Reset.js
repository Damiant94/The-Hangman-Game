import React, {memo} from 'react';
import classes from './Reset.module.css';

const reset = (props) => {
    return (
        <button type="button" className={classes.Reset} onClick={props.clickHandle}>Reset</button>
    );
};

export default memo(reset);