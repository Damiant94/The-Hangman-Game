import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {

    const secondClassName = props.show ? classes.visible : classes.hidden;

    return (
        <div className={`${classes.Backdrop} ${secondClassName}`}></div>
    )
};

export default backdrop;