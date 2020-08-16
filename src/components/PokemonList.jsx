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
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextOffset, setNextOffset] = useState(12);
  const [prevOffset, setPrevOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadPokemon = async (idList) => {
    if (idList.length === limit) {
      let _pokemonsData = await Promise.all(
        idList.map(async (id) => {
          let pokemonRecord = await fetchPokemon(id);
          return pokemonRecord;
        })
      );
      setPokemonsData(_pokemonsData);
      setHasMore(true);
    } else if (idList.includes(151)) {
      let _pokemonsData = await Promise.all(
        idList.map(async (id) => {
          let pokemonRecord = await fetchPokemon(id);
          return pokemonRecord;
        })
      );
      setPokemonsData(_pokemonsData);
      setHasMore(false);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const idList = getIdList(limit, offset);
      await loadPokemon(idList);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchPrev = async () => {
    if (prevOffset < 0) return;
    setLoading(true);
    const idList = getIdList(limit, prevOffset);
    await loadPokemon(idList);
    setOffset(prevOffset);
    setPrevOffset(prevOffset - limit);
    setNextOffset(prevOffset + limit);
    setLoading(false);
  };
  const fetchNext = async () => {
    setLoading(true);
    const idList = getIdList(limit, nextOffset);
    await loadPokemon(idList);
    if (hasMore) {
      setOffset(nextOffset);
      setPrevOffset(nextOffset - limit);
      setNextOffset(nextOffset + limit);
    }
    setLoading(false);
  };
  const lastPokeElementListRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNext();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div>
      <div className={classes.btn}>
        <button className={classes.pageBtn} onClick={fetchPrev}>
          Prev
        </button>
        <button className={classes.pageBtn} onClick={fetchNext}>
          Next
        </button>
      </div>
      <div ref={lastPokeElementListRef}>
        <Grid className={classes.pokeGrid}>
          {!loading ? (
            pokemonsData.map((pokemon) => {
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
            })
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </div>
    </div>
  );
}

export default PokemonList;
