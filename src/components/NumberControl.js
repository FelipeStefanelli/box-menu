import React, { useState } from 'react';

function NumberControl(props) {
    return (
        <div className='number-control'>
            <div className='less-icon' onClick={() => {
                if (document.getElementById(`${props.id}`).value !== '0') {
                    let value = parseInt(document.getElementById(`${props.id}`).value) - 1;
                    document.getElementById(`${props.id}`).value = value;
                }
                props.setProductTotal(props.productTotal - props.price);
            }}></div>
            <input className='number-input' type='number' id={props.id} name={props.id} />
            <div className='plus-icon white' onClick={() => {
                let value = parseInt(document.getElementById(`${props.id}`).value) + 1;
                document.getElementById(`${props.id}`).value = value;
                props.setProductTotal(props.productTotal + props.price);
            }}></div>
        </div>
    );
};

export default NumberControl;