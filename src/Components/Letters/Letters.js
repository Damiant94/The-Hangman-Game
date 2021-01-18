import React from 'react';
import classes from './Letters.module.css';

const Letters = (props) => {

    const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split("").map((letter) => {
        let letterDiv = React.createRef();
        return <button 
                    ref={letterDiv} 
                    key={letter} 
                    onClick={() => {
                        props.clickHandle(letterDiv.current);
                    }}>
                        {letter.toUpperCase()}
                </button>;
    });

    return (
        <div className={classes.Letters}>
            {allLetters}
        </div>
    );
};

export default Letters;