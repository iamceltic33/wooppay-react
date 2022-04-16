import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
import SearchService from './SearchService.jsx'

export default function Header() {
    return <header>
        <div className="container">
            <div className='navigation'>
                <Link to="/">На главную</Link>
            </div>

            <SearchService />
        </div>
    </header>
}
