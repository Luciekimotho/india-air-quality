import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" className={classes.grow}>
            English / Hindi
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
