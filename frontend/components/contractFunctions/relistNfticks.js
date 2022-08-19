import React from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3Modal'

import {
    contractAddress
} from '..../config' // to be edited 

// import smart contract abi 
import NFTMarket from '../utils/NFTMarket.json' // to be edited 

function resellNftick( tokenName, tokenId, newPrice ) {
    // bytes memory _tokenName,
    // uint256 tokenId,
    // uint256 newPrice
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(marketAddress, NFTMarket.abi, signer);

    const tokenName = 

    const tokenId = 

    const newPrice = ethers.utils.parseUnits(newPrice. 'ether') 

    const ResellNftick = await marketContract.relistNftick(); 

}

export default resellNftick()