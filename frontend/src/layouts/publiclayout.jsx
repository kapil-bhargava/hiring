import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/public/header'
import Footer from '../components/public/footer'

const PublicLayout = () => {
    return (
        <div >
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout