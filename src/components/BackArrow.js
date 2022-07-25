import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function BackArrow(props) {
    const navigate = useNavigate();
    return (
        <div className={`back-arrow${props.black ? ' black' : ' white'}`} onClick={() => navigate(-1)}></div>
    );
};

export default BackArrow;