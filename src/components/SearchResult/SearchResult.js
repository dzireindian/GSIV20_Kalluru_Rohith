import React, { Component } from "react";
import MovieList  from "../MovieList/MovieList";


import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

function SearchResult(props){
    return (<div class="card" style={{marginTop:"1rem"}}>
  <div class="card-header position-relative">
    Search Result <button onClick={props.close} class="btn-close position-absolute top-50 end-0 translate-middle-y"></button>
  </div>
  <div class="card-body">
    <MovieList movies={props.data}/>
  </div>
</div>);
}

export default SearchResult;
