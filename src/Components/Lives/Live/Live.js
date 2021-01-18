import React, {memo} from 'react';
import classes from './Live.module.css';

const live = (props) => {

    console.log("[Live.js] render");

    return (
        <div className={classes.Live}>
            <i className={`fas fa-heart ${classes[props.classFirst]}`}></i>
            <i className={`far fa-heart ${classes[props.classSecond]}`}></i>
        </div>
    );
};

export default memo(live);