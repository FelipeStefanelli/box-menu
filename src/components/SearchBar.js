import React, { useState } from 'react';

const SearchBar = (props) => {
    const [inputText, setInputText] = useState('');
    const [isPlacheholder, setIsPlacheholder] = useState(true);

    const onChangeInput = (event) => {
        setInputText(event.target.value);
    }

    const showPlaceholder = () => {
        if (isPlacheholder === false) {
            setIsPlacheholder(true);
        } else {
            setIsPlacheholder(false);
        }
    }
    return (
        <div className='input'>
            <input
                value={props.value ? props.value : inputText}
                onChange={props.onChange ? props.onChange : onChangeInput}
                onFocus={showPlaceholder}
                onBlur={showPlaceholder}
                className={`input-inner text${props.value && props.value !== "" ? ' filled' : inputText !== "" ? ' filled' : ''}`}
                placeholder={isPlacheholder ? 'Pesquise um prato' : ''}
                type='text'
                name='search-bar'
                id='search-bar'
                autoComplete="off"
            />
            <label htmlFor='search-bar' className="input-label"><span>Pesquise um prato</span></label>
            <div
                className='input-icon'
                onClick={() => props.iconClick()}
            >
            </div>
        </div>
    )
}
export default SearchBar;