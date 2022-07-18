import React from 'react'
import NavBar from '../commons/NavBar'
import Footer from '../commons/Footer'

function LandingScreen() {
    return (
        <div className='flex h-full flex-col'>
            <NavBar />
            <main className='flex-1 bg-sec-1'>

            </main>
            <Footer />
        </div>
    )
}

export default LandingScreen