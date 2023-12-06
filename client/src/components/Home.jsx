import pickerbanner from "./images/pickerbanner.png";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [stickModels, setStickModels] = useState([]);

  useEffect(() => {
    // Fetch stick models when the component mounts
    const fetchStickModels = async () => {
      try {
        const response = await axios.get("/api/stickmodels", { responseType: 'json' });

        console.log(response.data);
        setStickModels(response.data);
      } catch (error) {
        console.error("Error fetching stick models:", error);
      }
    };

    fetchStickModels();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <img
        src={pickerbanner}
        alt="Picker Banner"
        style={{ width: "350px", height: "auto" }}
      />
      <h1>Home Page Baybz</h1>

      <h2>Stick Models</h2>
      <ul>
        {stickModels.map((stickModel) => (
          <li key={stickModel.ModelID}>{stickModel.ModelName}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
