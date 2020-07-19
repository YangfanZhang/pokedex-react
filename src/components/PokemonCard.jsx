import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardMedia: {
    width: "130px",
    height: "130px",
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
}));

function toFirstCharUppercase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function PokemonCard(props) {
  const classes = useStyles();
  const pokemonData = props.pokemonData;
  const [pokemonTypes, setPokemonTypes] = useState([]);
  useEffect(() => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemonId + 1}`)
    .then(function (response) {
      const { data } = response;
      const { types } = data;
      const newTypes = [];
      types.forEach((type) => {
        const {
          type: { name },
        } = type;
        newTypes.push(name);
      });
      setPokemonTypes(newTypes);
    });
});

  return (
    <Grid item xs={4} key={props.pokemonId}>
      <Card>
        <CardMedia className={classes.cardMedia} image={pokemonData.sprite} />
        <CardContent className={classes.cardContent}>
          <Typography>{`${pokemonData.id}`}</Typography>
          <Typography>{`${toFirstCharUppercase(pokemonData.name)}`}</Typography>
          {pokemonTypes.map((pokemonType) => {
            return <Chip label = {`${pokemonType}`} />;
          })}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PokemonCard;
