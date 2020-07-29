import React, { useState, useRef, useCallback } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import PokemonList from "./PokemonList";

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
  },
});

function Pokedex() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const {pokemonsData, loading, hasMore} = PokemonList(currentPage);
  
  const observer = useRef();
  const lastPokemonElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(currentPage => currentPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  const [partyMember, setpartyMember] = useState([]);

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
      <div className={classes.pokeGrid}>
        {pokemonsData ? (
          <Grid container spacing={2} className={classes.pokedexContainer}>
            {Object.keys(pokemonsData).map((pokemonId) => {
              return (
                <PokemonCard
                  ref={lastPokemonElementRef}
                  key={pokemonId}
                  pokemonId={pokemonId}
                  pokemonData={pokemonsData[pokemonId]}
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
