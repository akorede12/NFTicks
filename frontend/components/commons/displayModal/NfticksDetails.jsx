import React from 'react'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import BlurImage from '../BlurImage';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: { xs: 200, sm: 250, md: 400 },
    width: { xs: '95%', md: '100%' },
    maxWidth: { xs: 400, sm: 500, md: 700 },
    outline: 'none',
    bgcolor: '#FCA311',
    border: 0,
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function NfticksDetails({ open, handleClose }) {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                // hideBackdrop={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='grid-cols-2 grid items-center gap-5'>
                            <div>
                                <BlurImage
                                    src={'/img/monkey1.png'}
                                    alt='nft-image'
                                    width='300px'
                                    className='rounded-3xl'
                                    height='300px'
                                    object-fit='contain'
                                />
                                <p className='text-white text-center font-semibold text-xs md:text-lg'>Chimp in spacesuit</p>
                            </div>
                            <div className='space-y-5'>
                                <div >
                                    <h2 className=' text-md md:text-3xl line-clamp-2 font-bold text-black'>Heavensland Concert</h2>
                                    <p className='text-white font-semibold text-xs md:text-lg'>Starboy records</p>
                                </div>
                                <p className='text-bold text-sm line-clamp-3 md:line-clamp-6 md:text-xl text-white'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus
                                </p>
                                <p className='text-black font-bold text-xs md:text-lg'>
                                    <span>Event location, Event location, Event location,</span>
                                    <span>Sunday, 25th September, 2022</span>
                                    <span>09:00 pm  -  02:00 am</span>
                                </p>
                            </div>
                        </div>
                    </Box>
                </Fade>

            </Modal>
        </div>
    )
}

export default NfticksDetails