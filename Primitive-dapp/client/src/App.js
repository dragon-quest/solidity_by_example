import React, { Component } from "react";
import PrimitivesContract from "./contracts/Primitives.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { boo: '', u8: '', u256: '', u: '', i8: '', i256: '', i: '', minInt: '', maxInt: '', addr: '', a: '', b: '', defaultBoo: '', defaultUint: '', defaultInt: '', defaultAddr: '', web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PrimitivesContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PrimitivesContract.abi,
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

    this.setState({ boo: await contract.methods.boo().call() ? 'true' : 'false' });
    this.setState({ u8: await contract.methods.u8().call() });
    this.setState({ u256: await contract.methods.u256().call() });
    this.setState({ u: await contract.methods.u().call() });
    this.setState({ i8: await contract.methods.i8().call() });
    this.setState({ i256: await contract.methods.i256().call() });
    this.setState({ i: await contract.methods.i().call() });
    this.setState({ minInt: await contract.methods.minInt().call() });
    this.setState({ maxInt: await contract.methods.maxInt().call() });
    this.setState({ addr: await contract.methods.addr().call() });
    this.setState({ a: await contract.methods.a().call() });
    this.setState({ b: await contract.methods.b().call() });
    this.setState({ defaultBoo: await contract.methods.defaultBoo().call() ? 'true' : 'false' });
    this.setState({ defaultUint: await contract.methods.defaultUint().call() });
    this.setState({ defaultInt: await contract.methods.defaultInt().call() });
    this.setState({ defaultAddr: await contract.methods.defaultAddr().call() });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Primitives</h1>
        {this.state.boo}<br></br>
        {this.state.u8}<br></br>
        {this.state.u256}<br></br>
        {this.state.u}<br></br>
        {this.state.i8}<br></br>
        {this.state.i256}<br></br>
        {this.state.i}<br></br>
        {this.state.minInt}<br></br>
        {this.state.maxInt}<br></br>
        {this.state.addr}<br></br>
        {this.state.a}<br></br>
        {this.state.b}<br></br>
        {this.state.defaultBoo}<br></br>
        {this.state.defaultUint}<br></br>
        {this.state.defaultInt}<br></br>
        {this.state.defaultAddr}<br></br>
      </div>
    );
  }
}

export default App;