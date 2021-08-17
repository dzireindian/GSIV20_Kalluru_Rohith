import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

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


let  MovieList = (props) =>{
    return (<div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" style={{marginTop: "1rem"}}>
          {props.movies.map((movie) => {
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
        </div>);
}

export default MovieList;
