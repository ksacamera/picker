import pickerbanner from "./images/pickerbanner.png";
import hockeyIMG from "./images/hockeyIMG.png";
import golfIMG from "./images/golfIMG.png";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  

  return (
    <>
      <Link to="/">
      <img
        src={pickerbanner}
        alt="Picker Banner"
        style={{ width: "550px", height: "auto" }}
      />
      </Link>
     

      <h3>Ice Hockey Sticks</h3>
      <Link to="/hockey">
      <img
        src={hockeyIMG}
        alt="Hockey"
        style={{ width: "350px", height: "auto" }}
      />
      </Link>

      <h3>Golf Equipment</h3>
      <Link to="/golf">
      <img
        src={golfIMG}
        alt="Golf"
        style={{ width: "350px", height: "auto" }}
      />
      </Link>
    </>
  );
};

export default Home;
