import React, {memo} from 'react';
import classes from './Live.module.css';

const live = (props) => {
    return (
        <div className={classes.Live} data-live={props.data}>
            <i className="fas fa-heart"></i>
            <i className="far fa-heart"></i>
        </div>
    );
};

export default memo(live);