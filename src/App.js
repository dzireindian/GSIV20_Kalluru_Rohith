import {BrowserRouter,Redirect,Route,Switch} from "react-router-dom";

import ListMovies from "./components/ListMovies/ListMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={ListMovies} />
        <Route exact path="/movie/:data" component={MovieDetails} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
