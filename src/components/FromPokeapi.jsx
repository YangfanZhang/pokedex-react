import axios from "axios";
import { useState, useEffect } from "react";

function FromPokeapi() {
  const [pokemonsData, setPokemonsData] = useState({});

  useEffect(() => {
    const limit = 151;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonsData = {};
        console.log(data);

        results.forEach((pokemon, index) => {
          axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
          .then(function (response){
            const { data } = response;
            const { types } = data;
            let newTypes = [];
            types.forEach((type) => {
              const {
                type: { name },
              } = type;
              newTypes.push(name);
            });
            newPokemonsData[index + 1] = {
                id: index + 1,
                name: pokemon.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`,
                types: newTypes,
              };
              newTypes = [];
          }
          );
        });
        setPokemonsData(newPokemonsData);
      });
  }, []);

  return pokemonsData;
}

export default FromPokeapi;
