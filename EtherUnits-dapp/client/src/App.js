import React, { Component } from "react";
import EtherUnitsContract from "./contracts/EtherUnits.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { web3: null, accounts: null, contract: null, oneWei: '', isOneWei: '', oneEther: '', isOneEther: '' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EtherUnitsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EtherUnitsContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    this.setState({ oneWei: await contract.methods.oneWei().call() });
    this.setState({ isOneWei: await contract.methods.isOneWei().call() ? 'true' : 'false' });
    this.setState({ oneEther: await contract.methods.oneEther().call() });
    this.setState({ isOneEther: await contract.methods.isOneEther().call() ? 'true' : 'false' });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Ether Units</h1>
        oneWei: {this.state.oneWei}<br></br>
        isOneWei: {this.state.isOneWei}<br></br>
        oneEther: {this.state.oneEther}<br></br>
        isOneEther: {this.state.isOneEther}<br></br>
      </div>
    );
  }
}

export default App;