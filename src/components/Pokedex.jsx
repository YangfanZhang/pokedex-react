import React, { useState} from "react";
import Header from "./Header";
import PokemonList from "./PokemonList";

function Pokedex() {
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
      <PokemonList addToParty={AddToParty} deleteFromParty={DeleteFromParty} />
    </div>
  );
}

export default Pokedex;
