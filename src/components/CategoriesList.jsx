import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./CategoriesList.scss";

export default function CategoriesList({ categories }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch("https://api.yii2-stage.test.wooppay.com/v1/service-category")
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => setError(true))
            .finally(() => {
                setLoading(null);
            })

    }, [])



    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    return <>
        <div className='category-container'>
            {data.map(category => <div className='category-item' key={category.id}>
                <Link to={`/category/${category.id}`} className='category-link'>
                    <img src={category.picture_url} alt={category.title} className="category-icon" />
                    <span className='category-title'>{category.title}</span>
                </Link>
            </div>)}

        </div>
    </>
}
