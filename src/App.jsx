import React from 'react'
import {
    Routes, Route
} from 'react-router-dom'

import CategoriesList from './components/CategoriesList.jsx'
import ServicesList from './components/ServicesList.jsx'
import Service from './components/Service.jsx'
import Header from './components/Header.jsx'
import NotFound from './components/NotFound.jsx'

export default function App() {



    return <>
        <Header />
        <main className="container">
            <Routes>
                <Route path='*' element={<NotFound />}></Route>
                <Route index element={<CategoriesList />}></Route>
                <Route path='category/:id' element={<ServicesList />}></Route>
                <Route path='service/:name' element={<Service />}></Route>
            </Routes>
        </main>
    </>
}
