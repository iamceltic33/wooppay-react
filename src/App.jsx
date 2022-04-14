import React from 'react'
import {
    Routes, Route
} from 'react-router-dom'

import CategoriesList from './components/CategoriesList.jsx'
import ServicesList from './components/ServicesList.jsx'
import Service from './components/Service.jsx'

export default function App() {



    return (
        <Routes>
            <Route index element={<CategoriesList />}></Route>
            <Route path='category/:id' element={<ServicesList />}></Route>
            <Route path='service/:name' element={<Service />}></Route>
        </Routes>
    )
}
