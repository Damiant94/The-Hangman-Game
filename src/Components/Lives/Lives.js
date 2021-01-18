import React, {memo} from 'react';
import classes from './Lives.module.css';
import Live from './Live/Live';

const lives = (props) => {

    console.log("[Lives.js] render");

    const hearts = [...Array(9)].map((_, i) => {
        if (props.lives > i) {
            return (
                <Live classFirst="defaultIcon" classSecond="alternativeIcon" key={i}/>
            ) 
        } else {
            return (
                <Live classFirst="alternativeIcon" classSecond="defaultIcon" key={i} />
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