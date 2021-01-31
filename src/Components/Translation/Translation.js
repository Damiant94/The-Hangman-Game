import React from 'react';
import classes from './Translation.module.css';

const translation = (props) => {

    const secondClassName = props.show ? classes.visible : classes.hidden;

    const buttonNext = props.definitionsNumber > 1 ? (
        <div 
            className={`${classes.IconWrapper}`}
            onClick={props.change}>
            <i className="fas fa-chevron-circle-right"></i>
        </div>
    ) : null;

    return (
        <div className={`${classes.Translation} ${secondClassName}`}>
            <div className={classes.Sentence}>{props.sentence}</div>
            <div className={classes.Definition}>{props.definition}</div>
            <div className={classes.Icons}>
                {buttonNext}
                <div 
                    className={classes.IconWrapper} 
                    onClick={props.hide}>
                        <i className="fas fa-times-circle"></i>
                </div>
            </div>

        </div>
    );
};

export default translation;