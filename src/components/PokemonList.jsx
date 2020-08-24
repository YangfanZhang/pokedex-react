import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchPokemon, getIdList } from "./FromPokeapi";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    alignSelf: "center",
  },
  pokeGrid: {
    marginTop: "2%",
    marginButtom: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: "10px",
  },
  btn: {
    marginTop: "1%",
    marginButtom: "1%",
    textAlign: "center",
  },
  pageBtn: {
    textAlign: "center",
  },
});

function PokemonList(props) {
  const classes = useStyles();
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  async function loadPokemon(idList){
    setLoading(true);
    if (idList.length === limit) {
      let _pokemonsData = await Promise.all(
        idList.map(async (id) => {
          let pokemonRecord = await fetchPokemon(id);
          return pokemonRecord;
        })
      );
      setPokemonsList((prevMembers) => {
          return [...new Set([...prevMembers, ..._pokemonsData])];
      });
      setHasMore(true);
    } else if (idList.includes(151)) {
      let _pokemonsData = await Promise.all(
        idList.map(async (id) => {
          let pokemonRecord = await fetchPokemon(id);
          return pokemonRecord;
        })
      );
      setPokemonsList((prevMembers) => {
        return [...prevMembers, ..._pokemonsData];
      });
      setHasMore(false);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const idList = getIdList(limit, offset);
      await loadPokemon(idList);
    }
    fetchData();
  }, [offset]);

  const lastPokeElementListRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(offset + limit);
        }
      });
      if (node) observer.current.observe(node); 
    },
    [offset, hasMore, loading]
  );
  return (
    <div>
      <div className={classes.btn}></div>
      <Grid className={classes.pokeGrid}>
         { pokemonsList.map((pokemon) => {
            const { types, sprites, name, id } = pokemon;
            return (
              <PokemonCard
                key={id}
                id={id}
                types={types}
                img={sprites}
                name={name}
                addToParty={props.addToParty}
                deleteFromParty={props.deleteFromParty}
              />
            );
          })}
      </Grid>
      <div ref={lastPokeElementListRef}></div>
    </div>
  );
}

export default PokemonList;
