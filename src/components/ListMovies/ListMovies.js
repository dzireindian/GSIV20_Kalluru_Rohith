import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import Lottie from "lottie-react";
// import StarRatingComponent from "react-star-rating-component";
import animationData from "../../LottieLoader.json";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ListMovies.css";

let jwt = require("jwt-simple");

function MovieCard(props) {
  return (
    <div style={{ width: "20%", height: "2%" }} class="col">
      <div class="card rounded-3">
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${props.image}`}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col" style={{width:"10px"}}>
                  <p class="text-truncate">{props.title}</p>
                </div>
                <div class="col">
                  <span class="fw-bold">Rating : </span>
                  {props.rating}
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-truncate">{props.desc}</p>
                </div>
              </div>
            </div>
          </div>
          <a class="stretched-link" href={`/movie/${jwt.encode(props.data,process.env.REACT_APP_ENC_KEY)}`}
          ></a>
        </div>
      </div>
  );
}

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, movies: [] };
    this.dataframe = null;
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
        this.setState({ loading: false, movies: result.results });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    if (this.state.loading) {
      this.fetchMovies();
      return (
        <Lottie
          style={{ height: "100vh", width: "100%" }}
          animationData={animationData}
        />
      );
    }

    console.log("movies = ", this.state.movies);

    return (
      <div class="container container-mod">
        <div class="row">
          <nav class="navbar navbar-light bg-light border-bottom shadow rounded">
            <div class="position-relative container-fluid">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  style={{ backgroundColor: "grey" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <div class="position-absolute top-50 end-0 translate-middle-y">
                <Link to="/"><i class="bi bi-house-door-fill"></i></Link>
              </div>
            </div>
          </nav>
        </div>
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" style={{marginTop: "1rem"}}>
          {this.state.movies.map((movie) => {
            return (
              <MovieCard
                data={movie}
                title={movie.title}
                image={movie.backdrop_path}
                desc={movie.overview}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListMovies;
