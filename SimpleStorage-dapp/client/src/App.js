import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { web3: null, accounts: null, contract: null, num: '', value: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
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

    this.setState({ num: await contract.methods.get().call() });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const { accounts, contract, value } = this.state;

    await contract.methods.set(value).send({ from: accounts[0] });
    this.setState({ num: await contract.methods.get().call() });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>SimpleStorage</h1>
        {this.state.num}
        <form onSubmit={this.handleSubmit}>
        <label>
          Num:
          <input type="number" min="0" onChange={(event) => this.setState({value: event.target.value})}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default App;