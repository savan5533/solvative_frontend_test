import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Table.module.css";
const Table = ({ searchQuery }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    axios
      .get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
        params: {
          limit,
          namePrefix: searchQuery,
          offset: (currentPage - 1) * limit, // Calculate offset for pagination
        },
        headers: {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key":
            "717761a733mshed007b0ad08d6b9p1c940cjsnfd7c321c418f",
        },
      })
      .then((response) => {
        setCities(response.data.data);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / limit)); // Calculate total pages
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [searchQuery, currentPage, limit]);

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    if (newLimit < 1) {
      setLimit(1);
    } else if (newLimit > 10) {
      setLimit(10);
      alert("Maximum limit exceeded! Maximum allowed is 10.");
    } else {
      setLimit(newLimit);
    }
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  let tableContent;
  if (isLoading) {
    tableContent = (
      <tr>
        <td colSpan="3" className={styles.loading}>
          Loading...
        </td>
      </tr>
    );
  } else if (!searchQuery) {
    tableContent = (
      <tr>
        <td colSpan="3" className={styles.empty}>
          Start searching
        </td>
      </tr>
    );
  } else if (cities.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="3" className={styles.empty}>
          No result found
        </td>
      </tr>
    );
  } else {
    tableContent = cities.map((city, index) => (
      <tr key={city.id}>
        <td>{index + 1}</td>
        <td>{city.name}</td>
        <td>
          {city.countryCode && (
            <img
              src={`https://countryflagsapi.com/png/${city.countryCode
                .slice(0, 2)
                .toLowerCase()}`}
              alt={city.country}
              className={styles.flag}
            />
          )}
        </td>
      </tr>
    ));
  }

  return (
    <div className={styles.cityTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}
      {/* Limit input box */}
      <div className={styles.limitInput}>
        <label htmlFor="limit">Items per page:</label>
        <input
          type="number"
          id="limit"
          min={1}
          max={10}
          value={limit}
          onChange={handleLimitChange}
        />
      </div>
    </div>
  );
};

export default Table;
