import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import NavBar from '../components/commons/NavBar'
import Footer from '../components/commons/Footer'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

// import nftick contract address 
import {
    contractAddress
} from '../utils/config'

// import smart contract abi 
import NFTick from '../utils/NFTick.json'

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({
        price: '', name: '', description: '', totalTokens: '', amounts: '', tokenIds: ''
    })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]
        try {
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
    async function uploadToIPFS() {
        const { name, description, price, totalTokens, amounts, tokenIds } = formInput
        if (!name || !description || !price || !totalTokens || !amounts || !tokenIds || !fileUrl) return
        /* first, upload to IPFS*/
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
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
        const name = ethers.utils.formatBytes32String(formInput.name)
        const tokenIds = ethers.utils.parseUnits(formInput.tokenIds)
        const totalTokens = ethers.utils.parseUnits(formInput.totalTokens)
        const amounts = ethers.utils.parseUnits(formInput.amounts)
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        let nftickContract = new ethers.Contract(contractAddress, NFTick.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        let transaction = await contract.createNFTick(
            tokenIds,
            amounts,
            url,
            price,
            totalTokens,
            name,
            { value: listingPrice })
        await transaction.wait()

        router.push('/')
    }

    return (
        <div>
            <NavBar />
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input
                        placeholder="Event Name"
                        className="mt-8 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Event Description"
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                    <input
                        placeholder='ticket Ids'
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, tokenIds: e.target.value })}
                    />
                    <input
                        placeholder='number of nfticks for each ticket Id'
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, amounts: e.target.value })}
                    />
                    <input
                        placeholder='Price of Event nfticks'
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <input
                        placeholder='Total number of Event nfticks'
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, totalTokens: e.target.value })}
                    />
                    <input
                        type="file"
                        name="Asset"
                        className="my-4"
                        onChange={onChange}
                    />
                    {
                        fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl} />
                        )
                    }
                    <button onClick={listNFTForSale} className="font-bold mt-4 bg-red-500 text-white rounded p-4 shadow-lg">
                        Create Event
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}