import React, {memo} from 'react';
import classes from './Sentence.module.css';

const sentence = (props) => {    
    return (
        <div className={classes.Sentence}>{props.currentSentence}</div>
    );
};

export default memo(sentence);