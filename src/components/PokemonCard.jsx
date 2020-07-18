import React, { useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import mockData from "./mockData";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardMedia:{
      width: "130px",
      height: "130px",
      margin:"auto",
  },
  cardContent:{
    textAlign: "center",
  }
}));
// const toFirstCharUppercase = name =>
//   name.charAt(0).toUpperCase() + name.slice(1);
function toFirstCharUppercase(text){
    return (text.charAt(0).toUpperCase() + text.slice(1));
}

function PokemonCard(props) {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(mockData);
  const {
    name,
    id,
    sprites: { front_default },
  } = pokemonData[props.pokemonId];
  return (
    <Grid item xs={4} key={props.pokemonId}>
      <Card>
        <CardMedia 
        className={classes.cardMedia}
            image={front_default}
        />
        <CardContent className={classes.cardContent}>
            <Typography >{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PokemonCard;
