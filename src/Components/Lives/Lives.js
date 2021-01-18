import React from 'react';
import classes from './Lives.module.css';

const lives = (props) => {

    const hearts = [...Array(9)].map((_, i) => {
        if (props.lives > i) {
            return (
                <div key={i}>
                    <i className={`fas fa-heart ${classes.defaultIcon}`} data-i={i}></i>
                    <i className={`far fa-heart ${classes.alternativeIcon}`} data-i={i}></i>
                </div>
            ) 
        } else {
            return (
                <div key={i}>
                    <i className={`fas fa-heart ${classes.alternativeIcon}`} data-i={i}></i>
                    <i className={`far fa-heart ${classes.defaultIcon}`} data-i={i}></i>
                </div>
            ) 
        }

    });

    return (
        <div className={classes.Lives}>
            {hearts}
        </div>
    );
};

export default lives;