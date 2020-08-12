import React, { useState, useEffect } from "react";
import { fetchPokemon, getIdList } from "./FromPokeapi";
import PokemonCard from "./PokemonCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

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

function PokemonList(props) {
  const classes = useStyles();
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [prevOffset, setPrevOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadPokemon = async (idList) => {
    let _pokemonsData = await Promise.all(
      idList.map(async (id) => {
        let pokemonRecord = await fetchPokemon(id);
        return pokemonRecord;
      })
    );
    setPokemonsData(_pokemonsData);
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
    if (prevOffset ===0 ) return;
    setLoading(true);
    const idList = getIdList(limit, prevOffset);
    await loadPokemon(idList);
    setNextOffset(offset);
    setPrevOffset(offset-limit);
    setLoading(false);
  }

  const fetchNext= async() => {
    setLoading(true);
    const idList = getIdList(limit, nextOffset);
    await loadPokemon(idList);
    setPrevOffset(offset);
    setNextOffset(offset+limit);
    setLoading(false);
  };

  return (
    <div>
          <div className="btn">
              <button onClick={fetchPrev}>Prev</button>
              <button onClick={fetchNext}>Next</button>
            </div>
      <div className={classes.pokeGrid}>
          <div
            // dataLength={pokemonsData.length}
            // next={fetchNext}
            // hasMore={true}
            // loader={<h4>Loading...</h4>}
          >
            {pokemonsData.map((pokemon) => {
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
          </div>
      </div>
    </div>
  );
}

export default PokemonList;
