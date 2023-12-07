import pickerbanner from "./images/pickerbanner.png";
import hockeyIMG from "./images/hockeyIMG.png";
import golfIMG from "./images/golfIMG.png";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  

  return (
    <>
      <img
        src={pickerbanner}
        alt="Picker Banner"
        style={{ width: "350px", height: "auto" }}
      />
      
      <h3>Ice Hockey Sticks</h3>
      <img
        src={hockeyIMG}
        alt="Hockey"
        style={{ width: "350px", height: "auto" }}
      />
      <h3>Golf Equipment</h3>
      <img
        src={golfIMG}
        alt="Golf"
        style={{ width: "350px", height: "auto" }}
      />
    </>
  );
};

export default Home;
