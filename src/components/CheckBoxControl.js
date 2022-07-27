import React, { useEffect } from 'react';

function CheckBoxControl(props) {
    return (
        <>
            <input className='checkbox' type='checkbox' id={props.id} name={props.id} onChange={(event) => {
                if (event.target.checked) {
                    props.setProductTotal(props.productTotal + props.price);
                } else {
                    props.setProductTotal(props.productTotal - props.price);
                }
            }} />
            <label htmlFor={props.id} />
        </>
    );
};

export default CheckBoxControl;