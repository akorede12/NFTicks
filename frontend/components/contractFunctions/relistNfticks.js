import React from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3Modal'

// import nftick contract address 
import {
    contractAddress
} from '../../utils/config'

// import smart contract abi 
import NFTick from '../../utils/NFTick.json'

function resellNftick( tokenName, tokenId, newPrice ) {

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const nftickContract = new ethers.Contract(contractAddress, NFTick.abi, signer);

    const Name = ethers.utils.formatBytes32String(tokenName);

    const Id = ethers.utils.parseUnits(tokenId);

    const Price = ethers.utils.parseUnits(newPrice. 'ether') 

    const ResellNftick = await nftickContract.relistNftick( Name, Id, Price); 

}

export default resellNftick()