import Image from 'next/image'
import React, { memo, useState } from 'react'
import { AccountCircle, MenuRounded, CloseRounded } from '@mui/icons-material';
import companyLogo from '../../../public/img/logo.png'
import { Button } from '@mui/material';
import navBarAnimations from '../../utils/gsapAnimations/navbar';
import Link from 'next/link';

function NavBar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    return (
        <header className=''>
            <nav className='relative flex py-2 px-10 bg-[#E5E5E5] justify-between items-center'>
                <Link href='/'>
                    <a>
                        <Image
                            src={companyLogo}
                            alt='company-logo'
                            objectFit='contain'
                        />
                    </a>

                </Link>

                <span className='md:hidden cursor-pointer'>
                    {
                        isMobileNavOpen ?
                            <CloseRounded onClick={() => { navBarAnimations.closeNav(); setIsMobileNavOpen(false) }} className='!text-[35px]' />
                            :
                            <MenuRounded onClick={() => { navBarAnimations.openNav(); setIsMobileNavOpen(true) }} className='!text-[35px]' />
                    }
                </span>


                <ul id='Nav-Web' className='hidden md:flex items-center space-x-6 font-bold text-black'>
                    <li>Marketplace</li>
                    <li>
                        <Link href='/mynfticks'>
                            <a>My Nfticks</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/create-event'>
                            <a>Create</a>
                        </Link>
                    </li>
                    <li>About</li>
                    <li>
                        <AccountCircle className='!text-[35px]' />
                    </li>
                    <li>
                        <Button className='!font-bold !bg-secondary !px-8 !text-black' variant="contained">Link Wallet</Button>
                    </li>
                </ul>
                <ul id='Nav-Mobile' className='flex-col z-10 absolute top-[86px] left-[-500px] min-w-[50%]  [background-color:rgba(255,_255,_255,_60%)] shadow backdrop-blur-md font-bold text-black md:hidden'>
                    <li className='py-5 px-4 cursor-pointer hover:bg-gray-300'>Marketplace</li>
                    <li className='py-5 px-4 cursor-pointer hover:bg-gray-300'>
                        <Link href='/mynfticks'>
                            <a>My Nfticks</a>
                        </Link></li>
                    <li className='py-5 px-4 cursor-pointer hover:bg-gray-300'>
                        <Link href='/create-event'>
                            <a>Create</a>
                        </Link>
                    </li>
                    <li className='py-5 px-4 cursor-pointer hover:bg-gray-300'>About</li>
                    <li className='py-5 px-4 cursor-pointer hover:bg-gray-300'>
                        <AccountCircle className='!text-[35px]' />
                    </li>
                    <li className='py-5 px-4 cursor-pointer hover:bg-gray-300'>
                        <Button className='!font-bold !bg-secondary !px-8 !text-black' variant="contained">Link Wallet</Button>
                    </li>
                </ul>

            </nav>

        </header>
    )
}

export default memo(NavBar)