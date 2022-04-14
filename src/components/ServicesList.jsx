import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./ServicesList.scss";

const picturePrefix = "https://static.test.wooppay.com/service/";
const defaultPicture = "/default.png";
let pageIndex = 0;
let pageTotalCount = 0;
const servicesPerPage = 32;
export default function CategoryInfo() {
    const params = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showData, setShowData] = useState([])
    useEffect(() => {
        fetch(`https://api.yii2-stage.test.wooppay.com/v1/service/all?category_id=${params.id}`)
            .then(response => response.json())
            .then(servicesData => {
                setData(servicesData.data);
                setShowData(servicesData.data.slice(pageIndex * servicesPerPage, pageIndex * servicesPerPage + servicesPerPage))
                pageTotalCount = Math.ceil(servicesData.data.length / servicesPerPage)
            })
            .catch(error => setError(error))
            .finally(() => {
                setLoading(false);
            })

    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const changePage = (page) => {
        pageIndex = page;
        setShowData(data.slice(pageIndex * servicesPerPage, pageIndex * servicesPerPage + servicesPerPage))
    }

    return <>
        <div className='services-container'>
            {showData.map(service => <div className='service-item' key={service.service_id}>
                <Link to={`/service/${service.service_name}`} className="service-link">
                    <img src={service.picture ? picturePrefix + service.picture : defaultPicture}
                        alt={service.title}
                        className="service-image"
                    />
                    {service.title}
                </Link>
            </div>)}
        </div>
        <div className="pagination">
            {Array.from({ length: pageTotalCount }).map((value, index) => (
                <button key={index}
                    className={`pagination-button${index === pageIndex ? " active" : ""}`}
                    onClick={() => { changePage(index) }}
                >{index + 1}</button>
            ))}
        </div>
    </>
}
