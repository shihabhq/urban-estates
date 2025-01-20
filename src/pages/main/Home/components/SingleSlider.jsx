import { Link } from "react-router";
import ButtonCovered from "../../../../shared/ButtonCovered";

const SingleSlider = ({ src }) => {
  return (
    <div>
      <img
        className="absolute inset-0 bg-cover bg-center -z-10 w-full h-full object-cover"
        src={src}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  );
};

export default SingleSlider;
