import React from 'react'
import "./ErrorMessage.scss"

export default function Error({ message, retry }) {
    let errorMessage = "Неизвестная ошибка";
    if (message) errorMessage = message;
    return <>
        <div className='error'>{errorMessage}</div>
    </>
}
