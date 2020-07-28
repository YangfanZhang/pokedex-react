import React, { useState, useEffect,useRef, useCallback } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";
import Chip from "@material-ui/core/Chip";

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
  const [pokemonsData, setPokemonsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
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

  useEffect(() => {
      const offset = 12 * currentPage - 1;
      setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonsData = {};
        setHasMore(offset < 152);

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
        setLoading(false);
      });
  }, [currentPage]);

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
