import React, { memo } from 'react'
import BlurImage from '../commons/BlurImage'
import Footer from '../commons/Footer'
import NavBar from '../commons/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getModalState, openModal } from '../../utils/reduxToolkit/features/modal'

function MyNfticksScreen() {
    const dispatch = useDispatch();
    const { isModalOpen } = useSelector(getModalState)
    const handleClick = () => {
        dispatch(openModal({ modalType: 'NFTicks-Details' }))
    }
    return (
        <div>
            <NavBar />
            <main className={`${isModalOpen ? 'blur-md' : ''}`}>
                <section className='space-y-5 px-5 py-10 md:px-20'>
                    <h1 className='text-primary font-bold text-2xl'>My NFTicks</h1>
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,_1fr))] justify-center gap-5'>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/monkey2.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/logo.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/monkey2.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/monkey1.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/monkey2.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/monkey2.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>
                        <div onClick={handleClick} className='relative cursor-pointer'>
                            <BlurImage
                                src={'/img/monkey2.png'}
                                alt='nft-image'
                                width='300px'
                                height='300px'
                                object-fit='contain'
                            />
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default memo(MyNfticksScreen)