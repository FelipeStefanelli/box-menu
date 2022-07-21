import React, { useState } from 'react';

function NumberControl(props) {
    const [value, setValue] = useState(0);
    return (
        <div className='number-control'>
            <input className='number-input' type='number' id={props.id} name={props.id} value={value} onChange={(value) => setValue(value)} />
            <div className='less-icon' onClick={() => {
                if (value !== 0) {
                    setValue(value - 1);
                }
            }}></div>
            <p>{value}</p>
            <div className='plus-icon white' onClick={() => { setValue(value + 1); }}></div>
        </div>
    );
};

export default NumberControl;