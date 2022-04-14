import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./SearchService.scss"

export default function Search() {
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showResults, setShowResults] = useState(false);
    const searchInput = useRef(null)
    const ref = useRef(null)

    useEffect(() => {
        function outsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("click", outsideClick)
        return () => {
            document.removeEventListener("click", outsideClick)
        }
    })

    const startSearch = (event) => {
        setLoading(true);
        event.preventDefault();
        setShowResults(true);
        fetch(`https://api.yii2-stage.test.wooppay.com/v1/service/search?name=${searchInput.current.value}`)
            .then(response => response.json())
            .then(data => {
                setSearchData(data);
            })
            .catch(error => setError(error))
            .finally(() => {
                setLoading(false);
            })
    }

    const renderResults = () => {
        if (error) return <div>Ошибка поиска</div>
        if (loading) return <div>Идёт поиск...</div>
        if (searchData.length === 0) return <div>По вашему запросу ничего не найдено</div>
        return <ul className='search-results-list'>
            {searchData.map(result => <li key={result.id}>
                <Link to={`/service/${result.name}`}>
                    <div className="result-title">
                        <img src={`https://static.test.wooppay.com/service/${result.picture}`} className="result-image" />
                        {result.title}
                    </div>
                    <div className='result-description'>{result.description}</div>
                </Link>
            </li>)}
        </ul>
    }
    return (
        <div className="search" ref={ref}>
            <form action="#" className='search-form' onSubmit={startSearch}>
                <input type="text" className='search-input' ref={searchInput} />
                <button type='submit' className='search-btn'>Поиск</button>
            </form>
            {showResults && <div className="search-results">
                {renderResults()}
            </div>
            }
        </div>
    )
}
