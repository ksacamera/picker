import pickerbanner from "./images/pickerbanner.png";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const StickDetail = () => {
  const { state } = useLocation();
  const [stickModel, setStickModel] = useState(null);

  const fetchStickModel = async (slug) => {
    try {
      const response = await axios.get(`/api/stickmodels/${slug}`);
      setStickModel(response.data);
    } catch (error) {
      console.error("Error fetching stick model details:", error);
    }
  };

  useEffect(() => {
    if (state && state.stickModel) {
      setStickModel(state.stickModel);
    } else {
      const slug = window.location.pathname.split("/")[2];
      fetchStickModel(slug);
    }
  }, [state]);

  const getPriceForStore = (storeName) => {
    if (stickModel && stickModel.prices) {
      const storePrice = stickModel.prices.find(
        (price) => price.store === storeName
      );

      if (
        storePrice &&
        typeof storePrice.price === "number" &&
        !isNaN(storePrice.price)
      ) {
        console.log(`Price for ${storeName}:`, storePrice.price);
        return `$${storePrice.price.toFixed(2)}`;
      } else {
        console.warn(`Invalid price for ${storeName}:`, storePrice.price);
        return "N/A";
      }
    }

    return "N/A";
  };

  if (!stickModel) {
    return <div>Loading stick model data...</div>;
  }

  const { Brand, ModelName, KickPoint, image, prices } = stickModel;

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
        {image && (
          <img
            src={image}
            alt={`${Brand.BrandName} ${ModelName}`}
            style={{ width: "300px", height: "auto" }}
          />
        )}
        <h3>Specs:</h3>
        <p>Kickpoint: {KickPoint?.KickPointName || "N/A"}</p>
        <p>Available Patterns:</p>
        <h3>Pricing:</h3>
        <p>
          Pure Hockey Price: $
          {stickModel?.prices
            ?.find((price) => price.store === "PureHockey")
            ?.price?.toFixed(2) || "N/A"}
        </p>
        <p>
          Hockey Monkey Price: $
          {stickModel?.prices
            ?.find((price) => price.store === "HockeyMonkey")
            ?.price?.toFixed(2) || "N/A"}
        </p>
        <p>
          Ice Warehouse Price: $
          {stickModel?.prices
            ?.find((price) => price.store === "IceWarehouse")
            ?.price?.toFixed(2) || "N/A"}
        </p>
        <p>
          Hockey World Price: $
          {stickModel?.prices
            ?.find((price) => price.store === "HockeyWorld")
            ?.price?.toFixed(2) || "N/A"}
        </p>
      </div>
    </>
  );
};

export default StickDetail;
