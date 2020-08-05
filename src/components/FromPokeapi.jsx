import axios from "axios";

function getIdList(limit, offset){
    return Array.from(Array(limit), (_, i) => (i + offset+ 1));
}

const fetchPokemon = async (id) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  return res.data;
};

function FromPokeapi(limit, offset) {
  const pokemonsData = {};
  const idList = getIdList(limit, offset);
  idList.forEach(async id => {
    const data = await fetchPokemon(id);
    const {types} = data;
    const {sprites} = data;
    const {name} = data;
    let newTypes = [];
    types.forEach((type) => {
      const {
        type: { name },
      } = type;
      newTypes.push(name);
    });
    pokemonsData[id] = {
        id: id,
        name: name,
        sprite: sprites.front_default,
        types: newTypes,
      };
      newTypes = [];
  });
  return pokemonsData;
 }

export default FromPokeapi;
