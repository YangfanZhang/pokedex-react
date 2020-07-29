import { useState, useEffect } from "react";
import axios from "axios";


function PokemonList(props) {
  const [pokemonsData, setPokemonsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
      const offset = 12 * props.currentPage - 1;
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
  }, [props.currentPage]);

  return {pokemonsData, loading, hasMore};
}

export default PokemonList;
