import React, { Component } from "react";
import IfElseContract from "./contracts/IfElse.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { web3: null, accounts: null, contract: null, foo: [], ternary: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IfElseContract.networks[networkId];
      const instance = new web3.eth.Contract(
        IfElseContract.abi,
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
    var foo = [];
    var ternary = []
    
    for (var i = 0; i < 21; i++) {
      foo.push(await contract.methods.foo(i).call())
    }

    for (var i = 0; i < 11; i++) {
      ternary.push(await contract.methods.ternary(i).call())
    }

    this.setState({foo: foo, ternary: ternary});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>If Else</h1>
        <div>
          <h2>Foo</h2>
          {
            this.state.foo.map((element, index) => <p>foo({index}) get foo {element}</p>)
          }
        </div>
        <div>
          <h2>Ternary</h2>
          {
            this.state.ternary.map((element, index) => <p>ternary({index}) get ternary {element}</p>)
          }
        </div>
      </div>
    );
  }
}

export default App;