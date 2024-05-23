// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "interfaces/IERC20.sol";

contract FastPay {
  address public cusdAddress; //cUSD

  enum Status {
    PENDING,
    PAID,
    CANCELLED
  }

  struct Listing {
    bytes32 id;
    address seller;
    address buyer;
    uint256 amount;
    Status status;
  }

  mapping(bytes32 => mapping(address => Listing)) public listings;

  // Additional data structures to keep track of id keys
  bytes32[] listingKeys;
  mapping(address => bytes32[]) addressToListing;

  event newListing(bytes32 indexed id, address indexed seller, uint256 amount);

  event ListingPaid(
    bytes32 indexed id,
    address indexed seller,
    address indexed buyer,
    uint amount
  );

  constructor(address _cusdAddress) {
    cusdAddress = _cusdAddress;
  }

  function addListing(bytes32 _id, uint _amount) public {
    // Store listing to user
    listings[_id][msg.sender] = Listing({
      id: _id,
      seller: msg.sender,
      buyer: address(0),
      amount: _amount,
      status: Status.PENDING
    });

    // If this is a new key, add it to the listingKeys array
    bool isNewBytesKey = true;
    for (uint256 i = 0; i < listingKeys.length; i++) {
      if (listingKeys[i] == _id) {
        isNewBytesKey = false;
        break;
      }
    }
    if (isNewBytesKey) {
      listingKeys.push(_id);
    }

    // If this address has not been associated with this key, add the key
    bool isNewAddressKey = true;
    bytes32[] storage bytesKeys = addressToListing[msg.sender];
    for (uint256 i = 0; i < bytesKeys.length; i++) {
      if (bytesKeys[i] == _id) {
        isNewAddressKey = false;
        break;
      }
    }
    if (isNewAddressKey) {
      addressToListing[msg.sender].push(_id);
    }
  }

  function getListing(
    bytes32 _id,
    address _seller
  ) public view returns (Listing memory) {
    return listings[_id][_seller];
  }

  function getAllListingsForAddress(
    address _seller
  ) public view returns (Listing[] memory) {
    bytes32[] storage bytesKeys = addressToListing[_seller];
    Listing[] memory structs = new Listing[](bytesKeys.length);

    for (uint256 i = 0; i < bytesKeys.length; i++) {
      structs[i] = listings[bytesKeys[i]][_seller];
    }

    return structs;
  }

  function payForListing(
    bytes32 _id,
    address _seller,
    uint256 _amount
  ) external {
    Listing storage listing = listings[_id][_seller];

    require(listing.status == Status.PENDING, "Invalid listing");
    require(_amount >= listing.amount, "Insufficient amount");

    //calculate charge
    uint256 balanceAfterCharge = listing.amount - deductCharge(listing.amount);

    //transfer payment to seller after charge
    IERC20(cusdAddress).transferFrom(
      msg.sender,
      listing.seller,
      balanceAfterCharge
    );

    listing.buyer = msg.sender;
    listing.status = Status.PAID;
  }

  function deductCharge(uint256 _amount) internal pure returns (uint256) {
    uint256 fee = _amount / 100; // 1%

    return fee;
  }
}
