// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import pickerbanner from "./images/pickerbanner.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Hockey = () => {
  const [brands, setBrands] = useState([]);
  const [stickModels, setStickModels] = useState([]);
  const [kickpoints, setKickpoints] = useState([]);
  const [selectedStick, setSelectedStick] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Make a GET request to fetch brands
    axios
      .get("/api/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    axios
      .get("/api/stickModels")
      .then((response) => {
        setStickModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stick models:", error);
      });

    axios
      .get("/api/kickpoints")
      .then((response) => {
        setKickpoints(response.data);
      })
      .catch((error) => {
        console.error("Error fetching kickpoints:", error);
      });
  }, []);

  const getKickpointName = (kickpointID) => {
    const kickpoint = kickpoints.find((kp) => kp.KickPointID === kickpointID);
    return kickpoint ? kickpoint.KickPointName : "Unknown Kickpoint";
  };

  const handleStickClick = (stickModel) => {
    navigate(`/stick/${stickModel.ModelID}`, { state: { stickModel } });
  };

  return (
    <>
    <Link to="/">
      <img
        src={pickerbanner}
        alt="Picker Banner"
        style={{ width: "550px", height: "auto" }}
      />
      </Link>

      <h1>Hockey Page</h1>

      <Link to="/stick-picker">
      <h2>Stick Picker</h2>
      </Link>

      <h2>Brands:</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.BrandID}>
            <img
              src={brand.avatar}
              alt={`${brand.BrandName} Avatar`}
              style={{ width: "100px", height: "auto" }}
            />
            {brand.BrandName}
          </li>
        ))}
      </ul>

      <h2>Stick Models</h2>
      <ul>
        {stickModels.map((stickModel) => (
          <li key={stickModel.ModelID} onClick={() => handleStickClick(stickModel)}>
            <strong>
              {stickModel.Brand
                ? `${stickModel.Brand.BrandName} ${stickModel.ModelName}`
                : "Unknown Brand"}
            </strong>{" "}
            - Kickpoint: {getKickpointName(stickModel.KickPointID)}

            {stickModel.image && (
              <img
                src={stickModel.image}
                alt={`${stickModel.Brand.BrandName} ${stickModel.ModelName}`}
                style={{ width: "300px", height: "auto", marginTop: "10px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Hockey;
