import React, {memo} from 'react';
import classes from './Lives.module.css';
import Live from './Live/Live';

const lives = () => {
    const hearts = [];

    for (const i of [...Array(9).keys()]) {
        hearts.push(<Live key={i} data={i+1}/>);
    }

    return (
        <div className={classes.Lives}>
            {hearts}
        </div>
    );
};

export default memo(lives);