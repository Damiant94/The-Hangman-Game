import React, {memo} from 'react';
import classes from './Heart.module.css';

const heart = (props) => {
    return (
        <div className={classes.Heart} data-heart={props.data}>
            <i className="fas fa-heart"></i>
            <i className="far fa-heart"></i>
        </div>
    );
};

export default memo(heart);