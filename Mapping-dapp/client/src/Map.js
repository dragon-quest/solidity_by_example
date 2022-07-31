import getWeb3 from "./getWeb3";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MappingContract from "./contracts/Mapping.json";

class Map extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    setAddress: "",
    setVal: "",
    getAddress: "",
    getVal: "",
    removeAddress: "",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MappingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MappingContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts } = this.state;

    this.setState({
      setAddress: accounts[0],
      setVal: 0,
      getAddress: "",
      getVal: "",
      removeAddress: "",
    });
  };

  handleSetSubmit = async (event) => {
    event.preventDefault();
    const { accounts, contract, setAddress, setVal } = this.state;

    await contract.methods.set(setAddress, setVal).send({ from: accounts[0] });
  };

  handleGetSubmit = async (event) => {
    event.preventDefault();
    const { contract, getAddress } = this.state;

    const val = await contract.methods.get(getAddress).call();

    this.setState((prevState) => ({
      ...prevState,
      getVal: val,
    }));
  };

  handleRemoveSubmit = async (event) => {
    event.preventDefault();
    const { accounts, contract, removeAddress } = this.state;

    await contract.methods.remove(removeAddress).send({ from: accounts[0] });
  };

  setCard = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSetSubmit}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Set Data
            </Typography>
            <TextField
              required
              id="outlined-required-1"
              label="Required"
              value={this.state.setAddress}
              helperText="Address"
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  setAddress: event.target.value,
                }));
              }}
            />
            <br></br>
            <br></br>
            <TextField
              required
              id="outlined-number"
              label="Number"
              type="number"
              value={this.state.setVal}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  setVal: event.target.value,
                }));
              }}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Set Submit
            </Button>
          </CardActions>
        </Box>
      </Card>
    );
  };

  getCard = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleGetSubmit}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Get Data
            </Typography>
            <TextField
              required
              id="outlined-required-2"
              label="Required"
              value={this.state.getAddress}
              helperText="Get Address"
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  getAddress: event.target.value,
                }));
              }}
            />
            <br></br>
            <br></br>
            <TextField
              id="outlined-read-only-input-2"
              label="Get Number"
              value={this.state.getVal}
              InputProps={{
                readOnly: true,
              }}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Get Submit
            </Button>
          </CardActions>
        </Box>
      </Card>
    );
  };

  removeCard = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleRemoveSubmit}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Remove Data
            </Typography>
            <TextField
              required
              id="outlined-required-3"
              label="Required"
              value={this.state.removeAddress}
              helperText="Remove Address"
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  removeAddress: event.target.value,
                }));
              }}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Remove Submit
            </Button>
          </CardActions>
        </Box>
      </Card>
    );
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const classes = this.props.classes;
    return (
      <div className={classes.app}>
        <h2>mapping</h2>
        {this.setCard()}
        <br></br>
        {this.getCard()}
        <br></br>
        {this.removeCard()}
      </div>
    );
  }
}

const styles = {
  app: {
    textAlign: "left",
  },
};

export default withStyles(styles)(Map);
