import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function BackArrow(props) {
    const navigate = useNavigate();
    return (
        <div className='back-arrow' onClick={() => navigate(`${props.to}`)}></div>
    );
};

export default BackArrow;