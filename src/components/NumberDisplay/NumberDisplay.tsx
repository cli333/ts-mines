import React from "react";
import "./NumberDisplay.scss";

interface AppProps {
  value: number;
}

const NumberDisplay: React.FC<AppProps> = ({ value }) => {
  return (
    <div className="NumberDisplay">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </div>
  );
};

export default NumberDisplay;
