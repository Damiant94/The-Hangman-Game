import React, {createRef, memo} from 'react';

const letter = (props) => {
    let letterBtn = createRef();

    return (
        <button 
            ref={letterBtn} 
            onClick={() => {props.onClick(letterBtn.current)}}>
                {props.value}
        </button>
    );
};

export default memo(letter);