import {BrowserRouter,Redirect,Route,Switch} from "react-router-dom";

import ListMovies from "./components/ListMovies/ListMovies"
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={ListMovies} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
