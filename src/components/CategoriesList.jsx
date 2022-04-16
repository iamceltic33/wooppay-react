import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from './Loading.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import "./CategoriesList.scss";

export default function CategoriesList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch("https://api.yii2-stage.test.wooppay.com/v1/service-category")
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => { setError(error); })
            .finally(() => {
                setLoading(null);
            })

    }, [])



    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    return <>
        <div className='category-container'>
            {data.map(category => <div className='category-item' key={category.id}>
                <Link to={`/category/${category.id}?page=1`} className='category-link'>
                    <img src={category.picture_url} alt={category.title} className="category-icon" />
                    <span className='category-title'>{category.title}</span>
                </Link>
            </div>)}

        </div>
    </>
}
