import React from 'react';
import classes from './Reset.module.css';

const reset = () => {
    return (
        <button type="button" className={classes.Reset} onClick={() => {window.location.reload()}}>Reset</button>
    );
};

export default reset;