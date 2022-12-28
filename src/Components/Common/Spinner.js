import React from "react";
import Lottie from "react-lottie-player";
import SpinnerJSon from "./spinner.json";

const Spinner = () => {
  return (
    <div className="spinner">
      <Lottie
        loop
        animationData={SpinnerJSon}
        play
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Spinner;
