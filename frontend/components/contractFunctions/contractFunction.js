import { useState } from 'react' 
// ethers library for communicating with the smart contract
import {ethers} from 'ethers'
// ipfs client for storing nft data on ipfs 
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

// import contraact address 
import {
    contractAddress
} from '..../config' // to be edited 

// import smart contract abi 
import NFTMarket from '../utils/NFTMarket.json' // to be edited 

// create Nftick event 
export default function createEvent () {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState (
        {
        tokenIds: '', 
        amounts: '', 
        data: '',
        price: '',
        totalTokens: '',
        tokenName: ''
    })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]
        try{
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}` 
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
    async function uploadToIPFS () {
        /*
        tokenIds: '', 
        amounts: '', 
        data: '',
        price: '',
        totalTokens: '',
        tokenName:
        */

        const {tokenIds, amounts, data, price, totalTokens, tokenName } = formInput 
        if (!name || !description || !price || !fileUrl) return 

        /* first, upload to IPFS*/
        const Data = JSON.stringify ({
            name, description, image: fileUrl 
        })
        try {
            const added = await client.add(Data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /*after file is uploaded to IPFS, return the URL to use it in the transaction */
            return url 
        } catch (error) {
            console.log('Error uploading file:', error)
        }
    }

    async function listNFTForSale() {
        const url = await uploadToIPFS()
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        /*next, create the item */
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketAddress, NFTMarket.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        let transaction = await contract.createToken(url, price, {value: listingPrice})
        await transaction.wait()

        router.push('/')
    }
}