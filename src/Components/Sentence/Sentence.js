import React, {memo} from 'react';
import classes from './Sentence.module.css';

const sentence = (props) => {

    console.log("[Sentence.js] render");
    
    return (
        <div className={classes.Sentence}>{props.currentSentence}</div>
    );
};

export default memo(sentence);