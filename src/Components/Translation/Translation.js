import React, {Fragment} from 'react';
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

    const definition = props.definition.split(" ").map((word, index) => {
        return (
            <Fragment key={index}>
                <a 
                    href={`https://dictionary.cambridge.org/dictionary/english/${word}`} 
                    target="_blank"
                    rel="noreferrer">
                    {word}
                </a>
                <span>{" "}</span>
            </Fragment>
        );
    })

    return (
        <div className={`${classes.Translation} ${secondClassName}`}>
            <div className={classes.Sentence}>
                <a 
                    href={`https://dictionary.cambridge.org/dictionary/english/${props.sentence}`} 
                    target="_blank"
                    rel="noreferrer">
                    {props.sentence}
                </a>
            </div>
            <div className={classes.Definition}>{definition}</div>
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