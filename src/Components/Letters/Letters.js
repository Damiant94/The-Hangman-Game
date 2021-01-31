import React, {memo} from 'react';
import classes from './Letters.module.css';
import Letter from './Letter/Letter';

const letters = (props) => {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("").map((letter) => {
        return (
            <Letter 
                key={letter}
                onClick={props.clickHandle}
                value={letter}
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