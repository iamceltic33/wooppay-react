import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Loading from './Loading.jsx';
import ErrorMessage from './ErrorMessage.jsx';
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
        if (error) return <ErrorMessage message="Ошибка поиска" />
        if (loading) return <Loading small />
        if (searchData.length === 0) return <div>По вашему запросу ничего не найдено</div>
        return <ul className='search-results-list'>
            {searchData.map(result => <li key={result.id}>
                <Link to={`/service/${result.name}`} className="result-item">
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
                <input type="text" className='search-input' ref={searchInput} placeholder="Поиск" />
                <button type='submit' className='search-btn'>
                    <svg className="search-icon" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M26.773 28.7073C25.7434 29.5331 24.4362 30.027 23.0136 30.027C19.6924 30.027 17 27.3347 17 24.0135C17 20.6923 19.6924 18 23.0136 18C26.3349 18 29.0272 20.6923 29.0272 24.0135C29.0272 25.4362 28.5332 26.7435 27.7073 27.7732L32 32.0658L31.0658 33L26.773 28.7073ZM27.7061 24.0135C27.7061 26.605 25.6052 28.7058 23.0136 28.7058C20.4221 28.7058 18.3212 26.605 18.3212 24.0135C18.3212 21.422 20.4221 19.3211 23.0136 19.3211C25.6052 19.3211 27.7061 21.422 27.7061 24.0135Z" fill="black" fillOpacity="0.5"></path>
                    </svg></button>
            </form>
            {showResults && <div className="search-results">
                {renderResults()}
            </div>
            }
        </div>
    )
}
