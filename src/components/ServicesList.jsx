import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from './Loading.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import "./ServicesList.scss";

const picturePrefix = "https://static.test.wooppay.com/service/";
const defaultPicture = "/default.png";
let pageTotalCount = 0;
const servicesPerPage = 32;
export default function CategoryInfo() {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showData, setShowData] = useState([])
    useEffect(() => {
        fetch(`https://api.yii2-stage.test.wooppay.com/v1/service/all?category_id=${params.id}`)
            .then(response => response.json())
            .then(servicesData => {
                setData(servicesData.data);
                setShowData(servicesData.data.slice((page - 1) * servicesPerPage, (page - 1) * servicesPerPage + servicesPerPage))
                pageTotalCount = Math.ceil(servicesData.data.length / servicesPerPage)
            })
            .catch(error => setError(error))
            .finally(() => {
                setLoading(false);
            })

    }, [])

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    const changePage = (page) => {
        setSearchParams({ page })
        setShowData(data.slice((page - 1) * servicesPerPage, (page - 1) * servicesPerPage + servicesPerPage))
    }

    return <>
        <div className='services-container'>
            {showData.map(service => <div className='service-item' key={service.service_id}>
                <Link to={`/service/${service.service_name}`} className="service-link">
                    <img src={service.picture ? picturePrefix + service.picture : defaultPicture}
                        alt={service.title}
                        className="service-image"
                    />
                    <div className="service-title">{service.title}</div>
                </Link>
            </div>)}
        </div>
        <div className="pagination">
            {Array.from({ length: pageTotalCount }).map((value, index) => (
                <button key={index}
                    className={`pagination-button${index === page - 1 ? " active" : ""}`}
                    onClick={() => { changePage(index + 1) }}
                >{index + 1}</button>
            ))}
        </div>
    </>
}
