// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract myToken is ERC20 {
    constructor() ERC20("COITON", "CTN") {}
}