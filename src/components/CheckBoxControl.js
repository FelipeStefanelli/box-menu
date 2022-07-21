import React, { useEffect } from 'react';

function CheckBoxControl(props) {
    return (
        <>
            <input className='checkbox' type='checkbox' id={props.id} name={props.id} />
            <label htmlFor={props.id} />
        </>
    );
};

export default CheckBoxControl;