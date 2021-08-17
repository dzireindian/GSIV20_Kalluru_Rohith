import React, { useState } from "react";
import {Link} from "react-router-dom";
import Lottie from "lottie-react";

import animationData from "../../LottieLoader.json";
import './MovieDetails.css';

const jwt = require('jwt-simple');
let load,setLoad;

function fetchCredits(data){

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`${process.env.REACT_APP_API_POINT}/movie/${data.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then(result => {
        console.log("credits = ",result)
        // credits = result;
        setLoad({load:false, credits:result});
      })
      .catch(error => console.log('error', error));

}

function MovieDetails(props){
  [load,setLoad] = useState({load:true});
  // load = true;
  let data = jwt.decode(props.match.params.data,process.env.REACT_APP_ENC_KEY);

  if (load.load) {
      fetchCredits(data);
      return (
        <Lottie
          style={{ height: "100vh", width: "100%" }}
          animationData={animationData}
        />
      );
    }
  var directors = load.credits.crew.filter(cast => cast.department === "Directing" & cast.job === "Director");
  console.log("after directing filter =",directors);
  directors = directors.map(cast => cast.name);
  directors = directors.join(",");
  var actors = load.credits.cast.filter(cast => cast.known_for_department === "Acting");
  actors = actors.map(cast => cast.name);
  actors = actors.join(',');

  return (<div class="container container-mod">
        <div class="row">
          <nav class="navbar navbar-light bg-light border-bottom shadow rounded">
            <div class="position-relative container-fluid">
              <p class="fs-3 text-start">Movie Details</p>
              <div class="position-absolute top-50 end-0 translate-middle-y">
                <Link to="/"><i class="bi bi-house-door-fill"></i></Link>
              </div>
            </div>
          </nav>
        </div>
        <div class="row" style={{marginTop:"1rem"}}>
        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-2">
      <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.backdrop_path}`} class="img-fluid rounded-start" alt="movie-image"/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <div class="d-flex flex-column">
      <div class="d-flex flex-row position-relative">
        <h2 class="card-title">{data.title}</h2>  <span class=" fs-3" style={{marginLeft:"2rem"}}>Rating: {data.vote_average}</span>
      </div>
        <p class="card-text"><small class="text-muted">Year: {data.release_date.split('-')[0]} | Directors: {directors} </small></p>
        <p class="card-text text-truncate" style={{width:"50%"}}>Cast: {actors}</p>
        <p class="card-text">{data.overview}</p>
      </div>
      </div>
    </div>
  </div>
</div>
        </div>
        </div>);
}

export default MovieDetails;
