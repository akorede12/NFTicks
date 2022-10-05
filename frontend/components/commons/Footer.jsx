import React, { memo } from 'react'

function Footer() {
    return (
        <footer className=''>
            <div className='g bg-primary p-5 px-10 text-white md:grid md:grid-cols-[2fr_1fr_1fr_1fr] items-center justify-items-center'>
                <div>
                    <h2 className='text-secondary text-lg font-bold'>NFTicks</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ab, illum voluptatibus alias accusantium nobis distinctio repudiandae quos eos animi ea, aspernatur neque excepturi</p>
                </div>
                <ul>
                    <li className='underline font-bold'>Company</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                </ul>
                <ul>
                    <li className='underline font-bold'>Company</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                </ul>
                <ul>
                    <li className='underline font-bold'>Company</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                    <li>Footer Link</li>
                </ul>
            </div>
            <p className='px-10'>&copy; {new Date().getFullYear()} NFTicks</p>
        </footer>
    )
}

export default memo(Footer)