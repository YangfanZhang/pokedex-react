import React from "react";
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
    props.addToParty(props.id);
  }

  function handleDelete(event) {
    props.deleteFromParty(props.id);
  }

  return (
    <Grid item xs={4} key={props.id} onClick={handleClick}>
      <Card hoverable="true" className={classes.cardItem}>
        <CardMedia className={classes.cardMedia} image={props.img.front_default} />
        <CardContent className={classes.cardContent}>
          <Typography>{`${props.id}`}</Typography>
          <Typography>{`${toFirstCharUppercase(props.name)}`}</Typography>
          {props.types.map((pokemonType, index) => {
        const {
           type: { name },
         } = pokemonType; 
            return <Chip key={index} label={`${name}`} />;
          })}
        </CardContent>
        <Chip onDelete={handleDelete} />
      </Card>
    </Grid>
  );
}

export default PokemonCard;
