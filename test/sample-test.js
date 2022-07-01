const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
var ETH = require("web3-eth");
let test;

// let SK_DOMAIN = {
//   name: 'SuperKluster',
//   version: '1',
//   chainId: 31337,
//   verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
// };

// let SK_TYPES = {
//   SuperKlusterItem: [
//     {name: "collection", type: "address"}, 
//     {name: "addr1", type: "address"}, 
//     {name: "addr2", type: "address"},
//     {name: "tokenId", type: "uint256"},
//     {name: "quantity", type: "uint256"},
//     {name: "price", type: "uint256"},
//     {name: "tokenURI", type: "string"},
//     {name: "nonce", type: "uint256"},
//     {name: "deadline", type: "uint256"}
//   ]
// };

describe("SK Tests", function() {
  this.beforeEach(async function() {
    [account1, account2, account3, account4] = await ethers.getSigners();

    const TEST = await ethers.getContractFactory("Test");

    test = await TEST.deploy(account1.address);
    await test.deployed();

    console.log("Marketplace Address: ", test.address);
  })

  it("UseCase105 Test", async function() {
    [ 
      account1, // admin key
      account2
    ] = await ethers.getSigners();

    // let addItem = {
    //   collection: "0xc9db3b61eb85834cb5064d52e5cd1dca35c71b1c",
    //   tokenId: 1123,
    //   supply: 1,
    //   tokenURI: "https://base_uri/url/back.json",
    //   deadline: 1664582399,
    //   nonce: 0,
    // };

      // const value = {
      //   collection: addItem.collection,
      //   addr1: account2.address,
      //   addr2: account2.address,
      //   tokenId: addItem.tokenId,
      //   quantity: addItem.supply,
      //   price: 0,
      //   tokenURI: addItem.tokenURI,
      //   nonce: addItem.nonce,
      //   deadline: addItem.deadline        
      // };
      let signature = await web3.eth.sign("0x50e255a73d200fd6365e4c58f756df5dd7e26ed02bed3b5a9baca066394fba26", account1.address);
      // const { r, s, v } = ethers.utils.splitSignature(signature);
      console.log(await test.connect(account2)._verify(
        "0x50e255a73d200fd6365e4c58f756df5dd7e26ed02bed3b5a9baca066394fba26", signature
      ));
  })
});
