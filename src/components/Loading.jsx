import React from 'react'
import "./Loading.scss"

export default function Loading({ small }) {
    let className = "loading";
    if (small) className += " small"
    return <div className={className}>
        <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
    </div>
}
