import React from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    }
});


function Pokedex() {
  return (
    <div>
      <Header />
      <h1>This is the pokedex page</h1>
    </div>
  );
}

export default Pokedex;
