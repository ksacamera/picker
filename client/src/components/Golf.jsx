import pickerbanner from "./images/pickerbanner.png";
import { Link } from "react-router-dom";

const Golf = () => {
  return (
    <>
      <Link to="/">
      <img
        src={pickerbanner}
        alt="Picker Banner"
        style={{ width: "550px", height: "auto" }}
      />
      </Link>
      <h1>Golf Page</h1>
    </>
  );
};

export default Golf;