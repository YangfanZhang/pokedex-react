import axios from "axios";

export function getIdList( limit, offset) {
    return Array.from(Array(limit), (_, i) => (i + offset+ 1));
}

export async function fetchPokemon(id) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  return res.data;
};
