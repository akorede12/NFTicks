// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";


contract NFTick is ERC1155, ERC1155Supply, ERC1155Holder  {
    // Owner of the contract
    address payable _owner;

    // Marketplace contract 
    address payable MarketAddress; 

    // total number of nftick events created on the platform
    uint256 public totalNoOfEvents;

    // total number of individual nfticks that have been created 
    uint256 public totalNoOfNfticks;

    // listing price of Nfts on marketplace 
    uint256 listingPrice = 1 ether; // ether is actually because contrcat will be deployed on matic
    

    constructor() ERC1155("") {
        _owner = payable(msg.sender);
        MarketAddress = payable(address(this)); 
        totalNoOfEvents = 0; 
        totalNoOfNfticks = 0;
    }
    // struct to store info of all nfticks with the same tokenName 
    struct nftickCollection {
        uint256 totalTokens;
        address payable owner; // This should be deleted, owner is the creator 
        address payable creator;
        bytes tokenName;
        bytes data;
        uint256[] Ids;
        uint256 listPrice;
    }
    // struct to store info of individual nfticks with the same tokenName 
    struct nftick {
        uint256 totalTokens;
        address payable owner;
        address payable creator;
        bytes tokenName;
        bytes data;
        uint256 tokenId;
        uint256 currentPrice;
    }
 

    // an event to keep track of when an nftick is created
    event nftickCreated (
        uint256 indexed tokenCount,
        address creator,
        address owner,
        uint256 price,
        bytes tokenName,
        bytes data,
        bool sold
    );

    //  (tokenName => mapping(tokenId => nftick))
    mapping(bytes => mapping( uint256 => nftick )) public allNfticks;

    // mapping for nfticks to eventCreators
    mapping( address => nftickCollection ) nftickCollectionToCreator;

    // mapping from totalNoOfEvents to nftick nftickCollection 
    mapping(uint256 => nftickCollection) public AllEventsCreated;

    // mapping from totalNoOfNfticks to nftick nftickCollection 
    mapping(uint256 => nftick) public AllNfticksCreated;

    // allow the owner of the marketplace to update the listing price 
    function updateListingPrice(uint _listingPrice) public payable {
    require( _owner == msg.sender, "only contract owner can call this function");
    listingPrice = _listingPrice;
    }

    // get marketplace listingPrice
    function getListingPrice() public view returns(uint256) {
    return listingPrice;
    }

    // get balance of nfticks for user accounts
    function getBalance(address account, uint256 id) public view {
    balanceOf( account, id);
    }
    
    // get batch balance of nfticks for user accounts
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view
        virtual
        override
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");
    

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    // Create nftick
    function createNFTick( 
        uint256[] memory tokenIds,  
        uint256[] memory amounts, 
        bytes memory _data,
        uint256 price,
        uint256 _totalTokens,
        bytes memory _tokenName
        )
        public
        payable
    {
    require(tokenIds.length == amounts.length, "ERC1155: ids and amounts length mismatch");
    // make sure the event creator pays the full listing price before they run this function
    require(msg.value >= listingPrice, "please transfer the listingPrice");
    // operator, from, to, ids, amounts, data
    _beforeTokenTransfer(msg.sender, address(0), MarketAddress, tokenIds, amounts, _data);
    // to, ids, amounts, data.     
    _mintBatch(MarketAddress, tokenIds, amounts, _data);
    // set approval for function caller: owner, operator, approved 
    _setApprovalForAll( MarketAddress, msg.sender, true);// not too sure if I want to use this function
    // from, to, ids, amounts, data
    //_safeBatchTransferFrom(address(0), MarketAddress, tokenIds, amounts, _data);
    // operator, from, to, id, value
    emit TransferBatch(msg.sender, address(0), MarketAddress,  tokenIds, amounts);
    // operator, from, ids, values, data 
    onERC1155BatchReceived( msg.sender, address(0), tokenIds, amounts, _data);  

    for(uint i = 0; i < tokenIds.length; i++){

        // update allNfticks mapping 
        allNfticks[_tokenName][tokenIds[i]] = nftick(
        _totalTokens,
        payable(MarketAddress),
        payable(msg.sender),
        _tokenName,
        _data, 
        tokenIds[i],
        price
        );
        
        // update AllNfticksCreated mapping 
        AllNfticksCreated[totalNoOfNfticks] = nftick(
        _totalTokens,
        payable(MarketAddress),
        payable(msg.sender),
        _tokenName,
        _data, 
        tokenIds[i],
        price
        );
        // update total number of nfticks 
        totalNoOfNfticks++;
    }

    // update AllEventsCreated mapping
    AllEventsCreated[totalNoOfEvents] = nftickCollection(
    _totalTokens,
    payable(MarketAddress),
    payable(msg.sender),
    _tokenName,
    _data, 
    tokenIds,
    price
    );

    // update nftickCollectionToCreator mapping
    nftickCollectionToCreator[msg.sender] =  nftickCollection(
    _totalTokens,
    payable(MarketAddress),
    payable(msg.sender),
    _tokenName,
    _data, 
    tokenIds,
    price
    );
    
    // increment totalNoOfEvents 
    totalNoOfEvents++;

    // emit nftickCreated event 
    emit nftickCreated (
        _totalTokens,
        msg.sender,
        MarketAddress,
        price,
        _tokenName,
        _data,
        false
        );

    }

    // function to buy nfticks 
    function buyNftick(
        uint256 _tokenId, 
        bytes memory _tokenName
        ) public payable returns(bool approved)
    {
    // get the price of each NFTick 
    uint256 Price = allNfticks[_tokenName][_tokenId].currentPrice; 
    // get the data of each nftick 
    bytes memory Data = allNfticks[_tokenName][_tokenId].data;

    // make sure the payment is equal to the price of the nftick 
    require( msg.value >= Price, "Not enough funds for transaction");

    // update owner of the nftick  
    allNfticks[_tokenName][_tokenId].owner = payable(msg.sender); 

    // update AllNfticksCreated mapping 
    /*I think this is going to be expensive to excecute, Sadly I can't think of an altenative at the moment, due to hackathon time constraints
    for now I'll leave it in just to get things to work 
    for(uint i = 0; i < totalNoOfNfticks ; i++) {
        if(AllNfticksCreated[i].tokenName = _tokenName) {
            if(allNfticks[_tokenName][_tokenId].tokenId == _tokenId) {
                AllNfticksCreated[i].owner == msg.sender;
            }    
        }     
    }
    */

    //transfer owner ship of nfticks to the marketplace 
    _safeTransferFrom(MarketAddress, msg.sender, _tokenId, 1, Data);
    // operator, from, to, id, value
    emit TransferSingle(MarketAddress, MarketAddress, msg.sender, _tokenId, 1);
    // operator, from, id, value, data 
    onERC1155Received( MarketAddress, MarketAddress, _tokenId, 1, Data);

    return true;
    }

    // function for relisting an nftick on the marketplace
    function relistNftick(
        bytes memory _tokenName,
        uint256 tokenId,
        uint256 newPrice
    ) payable public {
    // get the owner of an nftick 
    address Owner = allNfticks[_tokenName][tokenId].owner;
    // get nftick data 
    bytes memory Data = allNfticks[_tokenName][tokenId].data;
 
    // require that the function caller is the owner of nftick  
    require(msg.sender == Owner, "Wallet address does not own this nftick");

    //transfer ownership of nfticks to the marketplace 
    _safeTransferFrom(msg.sender, MarketAddress, tokenId, 1, Data);

    // operator, from, to, id, value
    emit TransferSingle( MarketAddress, msg.sender, MarketAddress, tokenId, 1);

    // update the price of the nftick 
    allNfticks[_tokenName][tokenId].currentPrice = newPrice;
    
    // update nftick owner to the market place address 
    allNfticks[_tokenName][tokenId].owner = MarketAddress;

    // operator, from, id, value, data 
    onERC1155Received( MarketAddress, msg.sender, tokenId, 1, Data);   
    }
    
    // function to get all nftick events that have been created by function caller on the marketplace 
    function fetchAllMyEvents() public view returns(nftickCollection[] memory) {
        // variable to store the number of collections that have been created by function caller
        uint collectionCount = 0;
        // variable to store the current index of events in collection array 
        uint currentIndex = 0;
        // get the event creators address
        address Creator = nftickCollectionToCreator[msg.sender].creator;

        // a loop to get the number of events the function caller has created 
        for(uint i = 0; i < totalNoOfEvents ; i++) {
           if(nftickCollectionToCreator[Creator].creator == msg.sender) {
               collectionCount += 1;
           }     
        }

        // a struck array to store each collection that has been created by function caller
        nftickCollection[] memory collection = new nftickCollection[](collectionCount);
        // loop to get all the events created by function caller and store them in collection array 
        for(uint i = 0; i < totalNoOfEvents ; i++){
            if(nftickCollectionToCreator[Creator].creator == msg.sender){
            uint currentId = i;
            // reference current collection
            nftickCollection storage currentCollection = AllEventsCreated[currentId];
            // store collection in the array
            collection[currentIndex] = currentCollection;
            // increment item index
            currentIndex += 1;
            }
        }
        return collection; 

    }

    // function to get all nftick Events that have been created  
    function fetchAllEventsCreated() public view returns(nftickCollection[] memory) {

        // variable to store the current index of events in collection array 
        uint currentIndex = 0;
        // a struck array to store each collection that has been created     
        nftickCollection[] memory collection = new nftickCollection[](totalNoOfEvents);
        // loop to get all the events created and store them in collection array 
        for(uint i = 0; i < totalNoOfEvents ; i++){
            uint currentId = i;
            // reference current collection
            nftickCollection storage currentCollection = AllEventsCreated[currentId];
            // store collection in the array
            collection[currentIndex] = currentCollection;
            // increment item index
            currentIndex += 1;
            
        }
        return collection; 

    }

    // function to get all nfticks that exist
    function fetchAllNfticks() public view returns(nftick[] memory) {
        // variable to store the current index of events in collection array 
        uint currentIndex = 0;

        // a struck array to store each nftick that has been created     
        nftick[] memory nftTicks = new nftick[](totalNoOfNfticks);

        // loop to get all the nftTick created and store them in the nftTicks array 
        for(uint i = 0; i < totalNoOfNfticks ; i++){
            // refernce number for current nftick
            uint currentId = i;
            // reference current nftick
            nftick storage currentNftick = AllNfticksCreated[currentId];
            // store current nftick in nfticks array
            nftTicks[currentIndex] = currentNftick;
            // increment item index
            currentIndex += 1;           
        }
        return nftTicks; 
    }

/*    // function to fetch all nfticks owned by the function caller 
    function fetchAllMyNfticks() public view returns(nftick[] memory) {
        
        // param to store count of all nfticks 
        uint nftCount = 0;

        // variable to store the current index of nfticks in Nfticks array 
        uint currentIndex = 0;

        // loop to get the count of all nfticks owned by function caller 
        for(uint i = 0; i < totalNoOfNfticks ; i++) {
           if(AllNfticksCreated[i].owner == msg.sender) {
               nftCount += 1;
           }     
        }
        // a struck array to store all nfticks that belong to the function caller      
        nftick[] memory Nfticks = new nftick[](nftCount);

        // loop to get all the nftTicks owned by function caller and store them in the nftTicks array 
        for(uint i = 0; i < totalNoOfNfticks ; i++){
        // allNfticks[_tokenName][tokenId].owner = payable(msg.sender);
        // AllNfticksCreated[i].owner == msg.sender
            if(AllNfticksCreated[i].owner == msg.sender) {
            uint currentId = i;
            // reference current collection
            nftick storage currentNftick = AllNfticksCreated[currentId];
            // store nftick in Nfticks array
            Nfticks[currentIndex] = currentNftick;
            // increment item index
            currentIndex += 1;
            }
        }
        return Nfticks; 
    }

*/
    // function to fetch all nfticks owned by the function caller 
    function fetchAllMyNfticks() public view returns(nftick[] memory) {
        
        // param to store count of all nfticks 
        uint nftCount = 0;

        // variable to store the current index of nfticks in Nfticks array 
        uint currentIndex = 0;

        // loop to get the count of all nfticks owned by function caller 
        for(uint i = 0; i < totalNoOfNfticks ; i++) {
           if(AllNfticksCreated[i].owner == msg.sender) {
               nftCount += 1;
           }     
        }
        // a struck array to store all nfticks that belong to the function caller      
        nftick[] memory Nfticks = new nftick[](nftCount);

        // loop to get all the nftTicks owned by function caller and store them in the nftTicks array 
        for(uint i = 0; i < totalNoOfNfticks ; i++){
            if(AllNfticksCreated[i].owner == msg.sender) {
            uint currentId = i;
            // reference current collection
            nftick storage currentNftick = AllNfticksCreated[currentId];
            // store nftick in Nfticks array
            Nfticks[currentIndex] = currentNftick;
            // increment item index
            currentIndex += 1;
            }
        }
        return Nfticks; 
    }


    function supportsInterface(bytes4 interfaceId) 
    public view virtual override(ERC1155, ERC1155Receiver) 
    returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {}

}
