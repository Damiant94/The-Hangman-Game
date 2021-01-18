import React, {memo} from 'react';
import classes from './Lives.module.css';
import Live from './Live/Live';

const lives = (props) => {
    const hearts = [...Array(9)].map((_, i) => {
        if (props.lives > i) {
            return (
                <Live classLive="Live" key={i}/>
            ) 
        } else {
            return (
                <Live classLive="LiveLost" key={i} />
            ) 
        }
    });

    return (
        <div className={classes.Lives}>
            {hearts}
        </div>
    );
};

export default memo(lives);