import React, { useState } from 'react'
import { MenuRounded, CloseRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { navBarAnimations } from '../../utils/gsapAnimations';

function NavBar() {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const handleNavClick = () => {
        setIsNavBarOpen(!isNavBarOpen);
        if (isNavBarOpen) navBarAnimations.close()
        else navBarAnimations.open()
    }
    return (
        <nav id='navbar-wr' className='flex sticky top-0 z-10 justify-between items-center p-4 bg-black'>
            <div className='logoText text-xl flex font-bold '>
                <span className=''>NFT</span>
                <small className=' self-end'>icks</small>
            </div>
            <div className='flex items-center space-x-3'>
                <ul id='nav-web' className='hidden list-none bg-black text-white items-center space-x-4 md:flex'>
                    <li className='cursor-pointer hover:underline'>How it works</li>
                    <li className='cursor-pointer hover:underline'>Market Place</li>
                    <li className='cursor-pointer hover:underline'>Events</li>
                    <li className='cursor-pointer hover:underline'>Create an NFT event</li>
                </ul>
                <ul id='nav-mobile' className='absolute hidden overflow-hidden !m-0 list-none left-0 top-[73px] w-full h-0 bg-black text-white md:hidden'>
                    <li className='p-4 border-t border-white hover:bg-sec-1'>How it works</li>
                    <li className='p-4 border-t border-white hover:bg-sec-1'>Market Place</li>
                    <li className='p-4 border-t border-white hover:bg-sec-1'>Events</li>
                    <li className='p-4 border-t border-white hover:bg-sec-1'>Create an NFT event</li>
                </ul>
                <Button className='!bg-white !text-black !font-bold !p-2' variant="contained">Connect Wallet</Button>
                <span className='cursor-pointer md:hidden' onClick={handleNavClick}>
                    {
                        isNavBarOpen ? <CloseRounded className=' !text-white' />
                            : <MenuRounded className=' !text-white' />
                    }
                </span>
            </div>

        </nav>
    )
}

export default NavBar