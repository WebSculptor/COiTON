// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


/// @title Events 
/// @author This library includes the event emitted for the real estate contract.

library EVENTS {
  // The event records the owner associated with newly created real estate listings.
    
    event CreatedListing(
        address indexed owner,
        uint indexed tokenId,
        uint indexed price
    );
//The `NewProposal` event records the submission of new proposals for real estate transactions.
    event NewProposal(
        address indexed from,
        uint indexed estateId,
        uint indexed price
    );
//The `PurchaseAgreementInitialization` event logs the start of a purchase agreement for a real estate transaction.
    event PurchaseAgreementInitialization(
        uint indexed estateId,
        address indexed initiator,
        address[] indexed signers
    );

    event Stake(address indexed user, uint indexed amount);

    event BuyShares(
        address indexed user,
        uint indexed amount,
        uint8 indexed shares
    );
    event SellShares(
        address indexed user,
        uint indexed amount,
        uint8 indexed shares
    );
}
