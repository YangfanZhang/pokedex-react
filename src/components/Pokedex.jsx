import React, { useState } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, CardMedia} from "@material-ui/core";
import mockData from "./mockData";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
});

function Pokedex() {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(mockData);

  return (
    <div>
      <Header />
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
         {Object.keys(pokemonData).map(pokemonId => {return <PokemonCard pokemonId={pokemonId}/>})}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Pokedex;
