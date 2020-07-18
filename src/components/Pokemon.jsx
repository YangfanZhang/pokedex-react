import React from "react";

function Pokemon(props) {
    const {match} = props;
    const {params} = match;
    const {pokemonId} = params;

  return <div>'this is the pokemon page for pokemon #{pokemonId}'</div>;
}

export default Pokemon;