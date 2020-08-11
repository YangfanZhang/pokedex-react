import React, { useState} from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import PokemonList from "./PokemonList";

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

function Pokedex() {
  // const classes = useStyles();
  const [partyMember, setpartyMember] = useState([]);

  // const handleScroll = (event) => {
  //   const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
  //   if (scrollHeight - scrollTop === clientHeight) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

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
