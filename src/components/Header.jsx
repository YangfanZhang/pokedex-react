import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#333333",
  },
  logo: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  pageName: {
    marginLeft: theme.spacing(3),
  },
  pageNames: {
    marginLeft: "auto",
    marginRight: theme.spacing(10),
    color: "#000000",
  },
  ash: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: "#E5E5E5",
    borderRadius: "50%",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div className={classes.pageNames}>
            <NavLink to="/pokedex" activeStyle={{ color: 'white' }}>
              <Button className={classes.pageName} color="inherit">
                Pokedex
              </Button>
            </NavLink>
            <NavLink to="/party" activeStyle={{ color: 'white' }}>
            <Button className={classes.pageName} color="inherit">
              Party
            </Button>
            </NavLink>
          </div>
          <img className={classes.ash} src="imgs/Ash.svg" alt="Josephmark" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
