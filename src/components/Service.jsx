import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Loading from './Loading.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import "./Service.scss";

export default function Service() {
    const params = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [validForm, setValidForm] = useState(true);
    useEffect(() => {
        fetch(`https://api.yii2-stage.test.wooppay.com/v1/service?service_name=${params.name}`)
            .then(response => response.json())
            .then(data => {
                if (data?.length > 0) {
                    setData(data[0]);
                } else {
                    setError({ message: "Сервис временно недоступен" })
                }
                console.log(data);
            })
            .catch(error => setError(error))
            .finally(() => {
                setLoading(false);
            })

    }, [])

    const formSubmit = (event) => {
        event.preventDefault();
        setValidForm(true);
        for (let element of event.target.elements) {
            if (element.tagName === "INPUT") {
                if (element.value === "") {
                    console.log(element.tagName);
                    setValidForm(false);
                    element.classList.add("not-valid");
                } else {
                    element.classList.remove("not-valid");
                }
            }
        }
    }

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />
    return <div className='service'>
        <div className="service-header">
            <img src={`https://static.test.wooppay.com/service/${data.picture}`} alt={data.title} />
            <h1 className='service-title'>{data.title}</h1>
        </div>
        <form action="#" className='service-form' onSubmit={formSubmit}>
            <div className="input-box">
                {data.fields.map(field => <input type="text"
                    key={field.id}
                    className='service-input'
                    name={field.name}
                    placeholder={field.title}
                />)}
            </div>
            <div className='form-bottom'>
                <button type='submit' className='submit-button'>Отправить</button>
                {!validForm && <span className='info hidden'>Поля не заполнены!</span>}
            </div>
        </form>
    </div>
}
