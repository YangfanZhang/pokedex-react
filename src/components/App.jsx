import React from "react";
import Pokedex from "./Pokedex.jsx";
import Party from "./Party.jsx";
import {Route, Switch} from "react-router-dom";
import {ReactQueryDevtools} from "react-query-devtools";

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props}/>}/>
      <Route exact path="/pokedex" render={(props) => <Pokedex {...props}/>}/>
      <Route exact path="/party" render={(props) => <Party {...props}/>}/>
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
export default App;
