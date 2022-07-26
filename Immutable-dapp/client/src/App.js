import React, { Component } from "react";
import ImmutableContract from "./contracts/Immutable.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { myAddress: '', myUint: '', web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ImmutableContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ImmutableContract.abi,
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

    this.setState({ myAddress: await contract.methods.MY_ADDRESS().call() });
    this.setState({ myUint: await contract.methods.MY_UINT().call() });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Constants</h1>
        {this.state.myAddress}<br></br>
        {this.state.myUint}<br></br>
      </div>
    );
  }
}

export default App;