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
import InputLabel from "@material-ui/core/InputLabel";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NestedMappingContract from "./contracts/NestedMapping.json";

class Nested extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    setAddress: "",
    setVal: "",
    setFlg: "",
    getAddress: "",
    getVal: "",
    getFlg: "",
    removeAddress: "",
    removeVal: "",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NestedMappingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        NestedMappingContract.abi,
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
      setFlg: true,
      getAddress: "",
      getVal: 0,
      getFlg: true,
      removeAddress: "",
      removeVal: 0,
    });
  };

  handleSetSubmit = async (event) => {
    event.preventDefault();
    const { accounts, contract, setAddress, setVal, setFlg } = this.state;

    await contract.methods
      .set(setAddress, setVal, setFlg)
      .send({ from: accounts[0] });
  };

  handleGetSubmit = async (event) => {
    event.preventDefault();
    const { contract, getAddress, getVal } = this.state;

    const flg = await contract.methods.get(getAddress, getVal).call();

    this.setState((prevState) => ({
      ...prevState,
      getFlg: flg,
    }));
  };

  handleRemoveSubmit = async (event) => {
    event.preventDefault();
    const { accounts, contract, removeAddress, removeVal } = this.state;

    await contract.methods
      .remove(removeAddress, removeVal)
      .send({ from: accounts[0] });
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
            <br></br>
            <br></br>
            <InputLabel id="demo-simple-select-label">Flg</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.setFlg}
              label="Flg"
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  setFlg: event.target.value,
                }));
              }}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
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
              required
              id="outlined-number-2"
              label="Number"
              type="number"
              value={this.state.getVal}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  getVal: event.target.value,
                }));
              }}
            />
            <br></br>
            <br></br>
            <InputLabel id="demo-simple-select-label-2">Flg</InputLabel>
            <Select
              readOnly
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={this.state.getFlg}
              label="Flg"
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
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
            <br></br>
            <br></br>
            <TextField
              required
              id="outlined-number-3"
              label="Number"
              type="number"
              value={this.state.removeVal}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                this.setState((prevState) => ({
                  ...prevState,
                  removeVal: event.target.value,
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
        <h2>nested</h2>
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

export default withStyles(styles)(Nested);
