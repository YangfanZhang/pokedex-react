import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardItem: {
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

  function handleClick(event) {
    props.addToParty(props.pokemonData.pokemonId);
  }

  function handleDelete(event) {
    props.deleteFromParty(props.pokemonData.pokemonId);
  }

  return (
    <Grid item xs={4} key={props.pokemonId} onClick={handleClick}>
      <Card hoverable="true" className={classes.cardItem}>
        <CardMedia className={classes.cardMedia} image={props.pokemonData.sprite} />
        <CardContent className={classes.cardContent}>
          <Typography>{`${props.pokemonData.id}`}</Typography>
          <Typography>{`${toFirstCharUppercase(props.pokemonData.name)}`}</Typography>
          {props.pokemonData.types.map((pokemonType) => {
            return <Chip label={`${pokemonType}`} />;
          })}
        </CardContent>
        <Chip onDelete={handleDelete} />
      </Card>
    </Grid>
  );
}

export default PokemonCard;
