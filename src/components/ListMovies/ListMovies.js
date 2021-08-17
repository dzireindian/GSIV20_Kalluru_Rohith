import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import Lottie from "lottie-react";
import SearchResult from "../SearchResult/SearchResult";
import MovieList  from "../MovieList/MovieList";
// import StarRatingComponent from "react-star-rating-component";
import animationData from "../../LottieLoader.json";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ListMovies.css";


let state,setState,dispatch;
    

  function searchMovie(query) {
      query = query.split(" ");
      query = query.join("+");
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`${process.env.REACT_APP_API_POINT}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((result) => {
        // ReactDOM.render(<SearchResult data={result.results}/>,document.getElementById('content'));
        setState({...state,loading:false,searchMovies:result.results})
      })
      .catch(error => console.log('error', error));
    }

  function fetchMovies() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_POINT}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((result) => {
        dispatch({type:"ADDMOVIES",payload:result.results})
        setState({...state,loading: false});
      })
      .catch((error) => console.log("error", error));
  }

  function ListMovies(props) {
    // var search =" ";
    dispatch = useDispatch();
    let movies = useSelector(state => state.listMovies);
    [state,setState] = useState({ loading: (movies.length === 0),search:false,searchMovies:[],searchString:" " });

    if (state.loading) {
      if(movies.length === 0){ fetchMovies();}
      console.log("search string =",state.searchString);
      if(state.search){searchMovie(state.searchString)}
      return (
        <Lottie
          style={{ height: "100vh", width: "100%" }}
          animationData={animationData}
        />
      );
    }

    // console.log("movies = ", this.state.movies);

    return (
      <div class="container container-mod">
        <div class="row">
          <nav class="navbar navbar-light bg-light border-bottom shadow rounded">
            <div class="position-relative container-fluid">
                <input id="search"
                  onKeyDown={event => {
                     if (event.key === 'Enter' || event.keyCode === 13) {
                        // console.log("search string =",this.search);
                        // console.log("search string =",event.target.value);
                        // ReactDOM.render(<Lottie style={{ height: "100vh", width: "100%" }}animationData={animationData}/>,
                        // document.getElementById('content'));
                        console.log("event string =",event.target.value)
                        // search = event.target.value;
                        setState({...state,loading: true,search:true, searchString: event.target.value})
                    }
                  }}
                  class="form-control me-2"
                  style={{ backgroundColor: "gainsboro", width:"60vh"}}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              <div class="position-absolute top-50 end-0 translate-middle-y">
                <Link to="/"><i class="bi bi-house-door-fill"></i></Link>
              </div>
            </div>
          </nav>
        </div>
        <div id="content">
        {state.search?<SearchResult close={() => {
          console.log('button clicked')
          setState({...state,search: false,searchString:" "});
        }} data={state.searchMovies} />:<MovieList movies={movies}/>}
        </div>
      </div>
    );
  }

export default ListMovies;
