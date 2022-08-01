const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "client/.env") });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { REACT_APP_INFURA_API_URL, REACT_APP_MNEMONIC } = process.env;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(REACT_APP_MNEMONIC, REACT_APP_INFURA_API_URL),
      network_id: 3,
      gas: 5500000,
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.13", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
