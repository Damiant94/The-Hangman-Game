import React, {createRef, memo} from 'react';
import classes from './Letter.module.css';

const letter = (props) => {
    let letterBtn = createRef();

    return (
        <button
            className={classes.Letter} 
            ref={letterBtn} 
            onClick={() => {props.onClick(letterBtn.current)}}>
                {props.value}
        </button>
    );
};

export default memo(letter);