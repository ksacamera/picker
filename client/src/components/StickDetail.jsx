import pickerbanner from "./images/pickerbanner.png";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const StickDetail = () => {
  const { state } = useLocation();
  const [stickModel, setStickModel] = useState(null);

  useEffect(() => {
    if (state && state.stickModel) {
      // If stickModel is available in the state, set it directly
      setStickModel(state.stickModel);
    } else {
      // If stickModel is not available in the state, fetch it using the slug
      const slug = window.location.pathname.split("/")[2]; // Assuming the slug is in the third segment of the URL
      axios
        .get(`/api/stickModels/${slug}`)
        .then((response) => {
          setStickModel(response.data);
        })
        .catch((error) => {
          console.error("Error fetching stick model details:", error);
        });
    }
  }, [state]);

  if (!stickModel) {
    // Handle loading or invalid stick model data
    return <div>Loading stick model data...</div>;
  }

  const { Brand, ModelName, KickPointID, image } = stickModel;


  return (
    <>
      <Link to="/">
        <img
          src={pickerbanner}
          alt="Picker Banner"
          style={{ width: "550px", height: "auto" }}
        />
      </Link>

      <div>
        <h1>
          {Brand ? `${Brand.BrandName} ${ModelName}` : "Unknown Stick Model"}
        </h1>
        <p>Kickpoint: {KickPointID}</p>
        {image && (
          <img
            src={image}
            alt={`${Brand.BrandName} ${ModelName}`}
            style={{ width: "300px", height: "auto" }}
          />
        )}
        {/* Add more details as needed */}
      </div>
    </>
  );
};

export default StickDetail;
