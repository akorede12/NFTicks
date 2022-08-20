import React from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3Modal'

// import nftick contract address 
import {
    contractAddress
} from '../../utils/config'

// import smart contract abi 
import NFTick from '../../utils/NFTick.json'

function fetchAllevents() { 

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const nftickContract = new ethers.Contract(contractAddress, NFTick.abi, signer)

    let allEvents = await nftickContract.fetchAllEventsCreated() 

}

export default fetchAllevents()