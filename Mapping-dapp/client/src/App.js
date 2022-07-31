import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Map from "./Map";
import Nested from "./Nested";

import "./App.css";

class App extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.app}>
        <Router>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                <NavLink className={classes.navLink} to="/">
                  map
                </NavLink>
                <NavLink className={classes.navLink} to="/nested-mapping/">
                  nested
                </NavLink>
              </Typography>
            </Toolbar>
          </AppBar>
          <Route path="/" exact component={Map} />
          <Route path="/nested-mapping/" component={Nested} />
        </Router>
      </div>
    );
  }
}

const styles = {
  app: {
    textAlign: "left",
  },
  navLink: {
    textDecorationLine: "none",
    marginRight: "1rem",
  },
};

export default withStyles(styles)(App);
