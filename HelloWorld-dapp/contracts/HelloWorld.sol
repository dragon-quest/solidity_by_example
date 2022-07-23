// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.13 and less than 0.9.0
pragma solidity ^0.8.13;

contract HelloWorld {
    string public _greet = "Hello World!";

    function greet() external view returns (string memory) {
        return _greet;
    }
}
