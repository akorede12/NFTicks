import React, { memo } from 'react'
import BlurImage from './BlurImage'

function CarouselCard({ imgSrc, isCarousel }) {
    return (
        <div className='relative max-w-[210px] '>
            <div className='relative w-full h-[200px]  '>
                <BlurImage
                    src={imgSrc}
                    alt='nft-image'
                    layout='fill'
                    object-fit='cover'
                />
            </div>
            <p className={`${isCarousel ? 'bg-[#14213D] text-white' : 'bg-app-gray text-primary'} p-4 `}>
                <span className='font-bold '>Event Name</span>
                <span className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni tempora quod, asperiores ipsam soluta aliquam incidunt? Facere labore, explicabo ducimus obcaecati ipsam deserunt repellendus eaque sunt modi soluta, suscipit reiciendis.</span>
            </p>
            <p className='absolute top-[141px] text-center w-[328px] flex h-[47px] right-[-187px] justify-center items-center rotate-[90deg] text-white p-1 bg-black'>14:00  -  19:00 20 / 09 / 2022</p>
        </div>
    )
}

export default memo(CarouselCard);