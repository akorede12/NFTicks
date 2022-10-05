import React, { memo } from 'react'
import Footer from '../commons/Footer'
import NavBar from '../commons/NavBar'
import { SearchRounded } from '@mui/icons-material';
import CarouselWrapper from '../commons/CarouselWrapper';
import CarouselCard from '../commons/CarouselCard';
import { Button } from '@mui/material';
import BlurImage from '../commons/BlurImage';

function LandingScreen() {
    return (
        <div>
            <NavBar />
            <main>
                <section className='bg-[#F0F0F0]'>
                    <div className='text-center px-5'>
                        <p className='text-lg font-bold'>An NFT Marketplace for Events, Meetings and Parties</p>
                        <div className='relative'>
                            <input
                                type="text"
                                className='pr-4 pl-10 py-2 w-full outline-none border-[3px] rounded-lg border-gray-300'
                            />
                            <SearchRounded className='absolute left-[12px] top-[11px]' />
                        </div>
                    </div>
                </section>
                <section className='px-10 py-10 md:px-20 space-y-5 bg-[#F0F0F0]'>
                    <h2 className='text-2xl text-secondary font-bold'>Popular Events</h2>
                    <div>

                        <CarouselWrapper>
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey1.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey2.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/logo.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey2.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey1.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/logo.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey1.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey2.png'}
                            />
                            <CarouselCard
                                isCarousel={true}
                                imgSrc={'/img/monkey1.png'}
                            />
                        </CarouselWrapper>
                    </div>
                    <p className='text-primary bg-secondary py-3 px-7 font-bold w-fit rounded-3xl'>View All Events</p>
                </section>
                <section className='px-10 py-10  md:px-20 space-y-5 bg-black'>
                    <h2 className='text-white text-2xl font-bold'>Upcoming Events</h2>
                    <div className='group md:grid md:grid-cols-[2fr_1.5fr_1fr] rounded-3xl items-center bg-white text-black '>
                        <div className='p-4 flex-[.45]'>
                            <div className='bg-secondary rounded-tl-3xl rounded-bl-3xl p-5 text-black space-y-3 font-bold'>
                                <h3 className='text-2xl  '>Event Name</h3>
                                <span>Location of event, location of event
                                    location of event</span>
                                <span className='block'>
                                    14:00  -  19:00
                                </span>
                            </div>
                        </div>
                        <div className='p-4 '>
                            <div className='font-bold'>
                                <h3 className='text-xl'>Event Descriptions:</h3>
                                <p className='line-clamp-2 md:line-clamp-5 text-[#323232]'>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur ipsum repudiandae provident pariatur repellendus odio nobis, voluptates sit quod doloribus ex. Suscipit quaerat atque animi nostrum temporibus, doloribus non illum.
                                </p>
                            </div>
                        </div>

                        <div className=' relative h-[208px] flex justify-center rounded-tr-3xl rounded-br-3xl items-center'>
                            <BlurImage
                                src={'/img/monkey1.png'}
                                alt='nft-image'
                                layout='fill'
                                width='100%'
                                className='rounded-tr-3xl rounded-br-3xl group-hover:opacity-30'
                                height='100%'
                                object-fit='contain'
                            />
                            <span className=' opacity-0 translate-x-[65px] duration-700 translate-y-[-25px] transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'>
                                <Button className='!font-bold   !bg-primary !px-8 !text-white ' variant="contained">Buy Now</Button>
                            </span>

                        </div>
                    </div>
                    <div className='group md:grid md:grid-cols-[2fr_1.5fr_1fr] rounded-3xl items-center bg-white text-black '>
                        <div className='p-4 flex-[.45]'>
                            <div className='bg-secondary rounded-tl-3xl rounded-bl-3xl p-5 text-black space-y-3 font-bold'>
                                <h3 className='text-2xl  '>Event Name</h3>
                                <span>Location of event, location of event
                                    location of event</span>
                                <span className='block'>
                                    14:00  -  19:00
                                </span>
                            </div>
                        </div>
                        <div className='p-4 '>
                            <div className='font-bold'>
                                <h3 className='text-xl'>Event Descriptions:</h3>
                                <p className='line-clamp-2 md:line-clamp-5 text-[#323232]'>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur ipsum repudiandae provident pariatur repellendus odio nobis, voluptates sit quod doloribus ex. Suscipit quaerat atque animi nostrum temporibus, doloribus non illum.
                                </p>
                            </div>
                        </div>

                        <div className=' relative h-[208px] flex justify-center rounded-tr-3xl rounded-br-3xl items-center'>
                            <BlurImage
                                src={'/img/monkey1.png'}
                                alt='nft-image'
                                layout='fill'
                                width='100%'
                                className='rounded-tr-3xl rounded-br-3xl group-hover:opacity-30'
                                height='100%'
                                object-fit='contain'
                            />
                            <span className=' opacity-0 translate-x-[65px] duration-700 translate-y-[-25px] transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'>
                                <Button className='!font-bold   !bg-primary !px-8 !text-white ' variant="contained">Buy Now</Button>
                            </span>

                        </div>
                    </div>
                    <div className='group md:grid md:grid-cols-[2fr_1.5fr_1fr] rounded-3xl items-center bg-white text-black '>
                        <div className='p-4 flex-[.45]'>
                            <div className='bg-secondary rounded-tl-3xl rounded-bl-3xl p-5 text-black space-y-3 font-bold'>
                                <h3 className='text-2xl  '>Event Name</h3>
                                <span>Location of event, location of event
                                    location of event</span>
                                <span className='block'>
                                    14:00  -  19:00
                                </span>
                            </div>
                        </div>
                        <div className='p-4 '>
                            <div className='font-bold'>
                                <h3 className='text-xl'>Event Descriptions:</h3>
                                <p className='line-clamp-2 md:line-clamp-5 text-[#323232]'>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur ipsum repudiandae provident pariatur repellendus odio nobis, voluptates sit quod doloribus ex. Suscipit quaerat atque animi nostrum temporibus, doloribus non illum.
                                </p>
                            </div>
                        </div>

                        <div className=' relative h-[208px] flex justify-center rounded-tr-3xl rounded-br-3xl items-center'>
                            <BlurImage
                                src={'/img/monkey1.png'}
                                alt='nft-image'
                                layout='fill'
                                width='100%'
                                className='rounded-tr-3xl rounded-br-3xl group-hover:opacity-30'
                                height='100%'
                                object-fit='contain'
                            />
                            <span className=' opacity-0 translate-x-[65px] duration-700 translate-y-[-25px] transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'>
                                <Button className='!font-bold   !bg-primary !px-8 !text-white ' variant="contained">Buy Now</Button>
                            </span>

                        </div>
                    </div>
                </section>
                <section>
                    <div className='grid grid-rows-1 md:grid-cols-2 p-5 items-center gap-8'>
                        <div>
                            <h2 className='font-bold text-2xl'>Join our Subscription List</h2>
                            <div className='relative'>
                                <input
                                    type="text"
                                    placeHolder='your email address'
                                    className='p-4 pr-[35%] bg-gray-300 border border-gray-500 rounded-3xl w-full'
                                />
                                <span className='absolute top-[11px] right-[25px]'>
                                    <Button className='!text-white !px-6 !bg-secondary !font-bold !rounded-3xl'>Subcribe</Button>
                                </span>

                            </div>
                        </div>
                        <div className='text-xl font-semibold'>
                            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips .
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default memo(LandingScreen)