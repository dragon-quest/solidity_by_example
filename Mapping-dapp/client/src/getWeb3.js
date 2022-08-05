import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) =>
    (async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const Chains = {
          1: "Mainnet",
          3: "Ropsten",
          4: "Rinkeby",
          42: "Kovan",
          1337: "Geth private chain(default )",
          61: "Ethereum Classic Mainnet",
          62: "Morden",
        };

        const hexChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const chainId = parseInt(hexChainId);
        const name = Chains[chainId];

        if (chainId === 3) {
          console.log(`Test network is ${name}`);
          const { REACT_APP_INFURA_API_URL, REACT_APP_MNEMONIC } = process.env;
          const HDWalletProvider = require("@truffle/hdwallet-provider");
          const web3 = new Web3(
            new HDWalletProvider(REACT_APP_MNEMONIC, REACT_APP_INFURA_API_URL)
          );
          resolve(web3);
        } else {
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
            // Accounts now exposed
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    })()
  );

export default getWeb3;
