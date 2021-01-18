import React, {memo} from 'react';
import classes from './Header.module.css';

const header = () => {

    console.log("[Header.js] render");

    return (
        <div className={classes.Header}>the hangman game</div>
    );
};

export default memo(header);