import React, { memo } from 'react'
import Footer from '../commons/Footer'
import NavBar from '../commons/NavBar'
import { RocketLaunchOutlined } from '@mui/icons-material';
import CarouselCard from '../commons/CarouselCard';

const CreateInputField = ({ label, placeholder, }) => (
    <div className='flex items-center'>
        <span className='flex-[.20] text-xs p-2 pl-4 font-bold whitespace-nowrap translate-x-5 bg-secondary text-black rounded-tl-2xl rounded-bl-2xl md:text-base'>{label}</span>
        <input
            type="text"
            placeholder={placeholder}
            className='flex-[.80] w-full p-3 pl-10 border-2 border-app-gray rounded-tr-2xl rounded-br-2xl'
        />
    </div>
)

function CreateEventScreen() {
    return (
        <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
            <NavBar />
            <main className=''>
                <section className='space-y-5 px-5 py-10 md:px-20'>
                    <h1 className='text-xl font-bold text-secondary'>Start An Event</h1>
                    <CreateInputField
                        label={'Event Name'}
                        placeholder='Name your event'
                    />
                    <CreateInputField
                        label={'Description'}
                        placeholder='What is your event about ?'
                    />
                    <CreateInputField
                        label={'No. of tickets'}
                        placeholder='How many tickets do you want to sell ?'
                    />
                    <CreateInputField
                        label={'Unique ID'}
                        placeholder='Beach-001'
                    />
                    <button className='group relative [box-shadow:inset_0_0_0_0.09px_#14213D] transition-all duration-[790ms] hover:[box-shadow:inset_230px_0_0_0_#14213D] rounded-full border-2 border-primary w-[227px] h-[56px]'>
                        <span className='font-bold group-hover:text-white transition-all duration-500 text-primary'>Create Event</span>
                        <span className='absolute translate-x-[-159px] transition-all duration-700 translate-y-[-15px] bg-primary border-2 border-primary p-3 rounded-full group-hover:translate-x-[15px] group-hover:bg-white'>
                            <RocketLaunchOutlined className='!text-white transition-all duration-700 group-hover:!text-primary' />
                        </span>
                    </button>
                </section>
                <section className='bg-primary px-5 py-10 md:px-20'>
                    <h2 className='text-white font-bold text-xl'>My Events</h2>
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(227px,_auto))] justify-items-center gap-10'>
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey1.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey2.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/logo.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey2.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey1.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/logo.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey1.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey2.png'}
                        />
                        <CarouselCard
                            isCarousel={false}
                            imgSrc={'/img/monkey1.png'}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default memo(CreateEventScreen)