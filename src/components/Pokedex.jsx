import React, { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
});

function Pokedex() {
  const classes = useStyles();
  const [pokemonsData, setPokemonsData] = useState({});
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonsData = {};

        results.forEach((pokemon, index) => {
          newPokemonsData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonsData(newPokemonsData);
      });
  }, []);

  return (
    <div>
      <Header />
      {pokemonsData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonsData).map((pokemonId) => {
            return (
              <PokemonCard
                pokemonId={pokemonId}
                pokemonData={pokemonsData[pokemonId]}
              />
            );
          })}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Pokedex;
