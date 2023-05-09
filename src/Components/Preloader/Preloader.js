import React from "react";
import styles from "./Preloader.module.scss";

const Preloader = () => {
  const { ldsRing } = styles;
  return (
    <div className={ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
