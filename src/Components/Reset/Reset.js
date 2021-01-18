import React, {memo} from 'react';
import classes from './Reset.module.css';

const reset = () => {
    console.log("[Reset.js] render");
    return (
        <button type="button" className={classes.Reset} onClick={() => {window.location.reload()}}>Reset</button>
    );
};

export default memo(reset);