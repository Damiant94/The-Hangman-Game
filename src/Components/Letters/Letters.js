import React, {memo} from 'react';
import classes from './Letters.module.css';
import Letter from './Letter/Letter';

const letters = (props) => {

    console.log("[Letters.js] render");

    const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split("").map((letter) => {
        return (
            <Letter 
                key={letter}
                onClick={props.clickHandle}
                value={letter.toUpperCase()}
            />
        )
    });

    return (
        <div className={classes.Letters}>
            {allLetters}
        </div>
    );
};

export default memo(letters);