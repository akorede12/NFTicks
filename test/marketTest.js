const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("NFTick contract", function () {
    async function deployContractFixture() {
        const contract = await ethers.getContractFactory("NFTick");
        // get 3 addresses from hre 
        const [owner, user1, user2] = await ethers.getSigners();

        // deploy contract
        const NFTickContract = await contract.deploy();

        await NFTickContract.deployed();

        // fixtures
        return { contract, NFTickContract, owner, user1, user2 };
    }

    it("should return listing price", async function () {
        // get contract object from fixture
        const { NFTickContract } = await loadFixture(deployContractFixture);


        const listPrice = await NFTickContract.getListingPrice();
        expect(listPrice).to.equal(1000000000000000000n);

        // expect(await NFTickContract.getListingPrice()).to.equal(1000000000000000000n);
    });

    it("should change listing price", async function () {
        // get contract object from fixrture 
        const { NFTickContract, owner } = await loadFixture(deployContractFixture);

        const newListPrice = await NFTickContract.connect(owner).updateListingPrice(2000);
        expect(await NFTickContract.getListingPrice()).to.equal(2000);
    })
    it("should call the createNFTick function and emit an event", async function () {
        /*
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        bytes memory _data,
        uint256 price,
        uint256 _totalTokens,
        bytes memory _tokenName
        */

        // get contract object from fixture 
        const { NFTickContract, owner } = await loadFixture(deployContractFixture);

        const listingPrice = await NFTickContract.getListingPrice();

        await expect(NFTickContract.connect(owner).createNFTick([1, 2, 3], [1, 1, 1], "0x416b6f7265646500000000000000000000000000000000000000000000000000", 1, 3, "0x416b6f7265646500000000000000000000000000000000000000000000000000", { value: listingPrice })).
            to.emit(NFTickContract, "TransferBatch").withArgs(owner.address, 0x0000000000000000000000000000000000000000, NFTickContract.address, [1, 2, 3], [1, 1, 1]);

        //  emit TransferBatch(msg.sender, address(0), MarketAddress,  tokenIds, amounts);

    });
});