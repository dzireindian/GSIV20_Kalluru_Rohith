import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
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


class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, movies: [],search:false,searchMovies:[],searchString:" " };
    // this.search = "";
  }

  searchMovie(query) {
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
        this.setState({...this.state,loading:false,searchMovies:result.results})
      })
      .catch(error => console.log('error', error));
}

  fetchMovies() {
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
        this.setState({...this.state,loading: false, movies: result.results });
      })
      .catch((error) => console.log("error", error));
  }

  // componentWillUpdate(){
  //   this.search = " ";
  // }

  // componentDidUpdate(){
  //   if(this.state.search === false){
  //       document.getElementById('search').value=" ";
  //   }
  // }

  render() {
    // var search =" ";

    if (this.state.loading) {
      if(this.state.movies.length === 0){ this.fetchMovies();}
      console.log("search string =",this.state.searchString);
      if(this.state.search){this.searchMovie(this.state.searchString)}
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
                        this.setState({...this.state,loading: true,search:true, searchString: event.target.value})
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
        {this.state.search?<SearchResult close={() => {
          console.log('button clicked')
          this.setState({...this.state,search: false,searchString:" "});
        }} data={this.state.searchMovies} />:<MovieList movies={this.state.movies}/>}
        </div>
      </div>
    );
  }
}

export default ListMovies;
