// StickDetail.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const StickDetail = () => {
  const { state } = useLocation();

  if (!state || !state.stickModel) {
    // Handle invalid or missing stick model data
    return <div>Invalid stick model data</div>;
  }

  const { Brand, ModelName, KickPointID, image } = state.stickModel;

  return (
    <div>
      <h1>{Brand ? `${Brand.BrandName} ${ModelName}` : "Unknown Stick Model"}</h1>
      <p>Kickpoint: {KickPointID}</p>
      {image && <img src={image} alt={`${Brand.BrandName} ${ModelName}`} style={{ width: "300px", height: "auto" }} />}
      {/* Add more details as needed */}
    </div>
  );
};

export default StickDetail;
