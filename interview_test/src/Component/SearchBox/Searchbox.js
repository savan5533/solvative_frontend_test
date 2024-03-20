import React, { useState, useEffect } from "react";
import styles from "./Searchbox.module.css";

const Searchbox = ({ onSearch }) => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState("");

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      setIsActive(true);
      document.getElementById("searchInput").focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(data);
  };

  return (
    <div className={`${styles.box} ${isActive && styles.active}`}>
      <form className={styles.form}onSubmit={handleSubmit}>
        <input
          id="searchInput"
          type="text"
          className={styles.inputBox}
          placeholder="Search places..."
          value={data}
          onChange={handleInputChange}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />   
      </form>
    </div>
  );
};

export default Searchbox;
