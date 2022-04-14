import React from 'react'
import "./Header.scss"
import SearchService from './SearchService.jsx'

export default function Header() {
    return <header>
        <div className="container">
            <div className='logo'>Logo</div>

            <SearchService />
        </div>
    </header>
}
