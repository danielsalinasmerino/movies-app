import React from "react";

import styles from "./loader.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 50, color = "#3498db" }) => {
  const loaderStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 10}px solid ${color}`,
    borderTop: `${size / 10}px solid transparent`,
  };

  return <div style={loaderStyle} className={styles.loader} />;
};

export default Loader;
