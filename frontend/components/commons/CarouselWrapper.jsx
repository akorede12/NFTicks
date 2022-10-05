import React, { memo } from 'react'
import Carousel from "react-multi-carousel";
import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from '@mui/icons-material';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        partialVisibilityGutter: 40,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 30,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 30,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function CarouselWrapper({ children }) {
    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button className='block absolute right-5 md:right-0 bg-white p-2 rounded-full'>
            <ArrowForwardIosRounded className='!bg-black !text-white rounded-full !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px] !p-[10px]' onClick={() => onClick()} />
        </button>;
    };

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button className='block absolute left-1 bg-white p-2 rounded-full'>
            <ArrowBackIosNewRounded className='!bg-black !text-white rounded-full !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px] !p-[10px]' onClick={() => onClick()} />
        </button>;
    };
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            ssr={false}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            swipeable
        >
            {children}
        </Carousel>

        // <Carousel
        //     swipeable={true}
        //     draggable={true}
        //     showDots={false}
        //     responsive={responsive}
        //     ssr={true} // means to render carousel on server-side.
        //     infinite={false}
        //     // customRightArrow={<CustomRightArrow />}
        //     // customLeftArrow={<CustomLeftArrow />}
        //     autoPlaySpeed={3000}
        //     keyBoardControl={true}
        //     customTransition="all 1"
        //     transitionDuration={5000}
        //     containerClass="carousel-container"
        // // removeArrowOnDeviceType={["tablet", "mobile"]}
        // // itemClass="carousel-item-padding-40-px"
        // >
        //     {children}
        // </Carousel>
    )
}

export default memo(CarouselWrapper)