import React, { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import FromPokeapi from "./FromPokeapi";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    alignSelf: "center",
  },
  pokeGrid: {
    marginLeft: "10%",
    marginRight: "10%",
    textAlign: "center",
    display: "grid",
    width: "800px",
    height: "800px",
    margin: "0 auto",
    overflow: "auto",
  },
});

function Pokedex() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [partyMember, setpartyMember] = useState([]);
  const pokemonsData = FromPokeapi(12, 0);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  console.log(pokemonsData);
  // console.log(pokemonsData.);
  console.log(pokemonsData[1]);

  function AddToParty(newId) {
    setpartyMember((prevMembers) => {
      if (prevMembers.length < 6 && !prevMembers.includes(newId)) {
        return [...prevMembers, newId];
      } else {
        return [...prevMembers];
      }
    });
  }

  function DeleteFromParty(newId) {
    setpartyMember((prevMembers) => {
      return prevMembers.filter((member) => {
        return member !== newId;
      });
    });
  }

  return (
    <div>
      <Header />
      <div className={classes.pokeGrid} onScroll={handleScroll}>
        {pokemonsData ? (
          <Grid
            container
            spacing={2}
            className={classes.pokedexContainer}
            onScroll={handleScroll}
          >
            {Object.keys(pokemonsData).map((id) => {
              return (
                <PokemonCard
                  key={id}
                  pokemonData={pokemonsData[id]}
                  addToParty={AddToParty}
                  deleteFromParty={DeleteFromParty}
                />
              );
            })}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>
      <div>
        {partyMember.map((member) => {
          return <Chip label={`${member}`} />;
        })}
      </div>
    </div>
  );
}

export default Pokedex;
