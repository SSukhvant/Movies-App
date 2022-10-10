import React from "react";
import Movies from "../Movies/Movies";

const MoviesContainer = ({ searchMovie, handleChange, data, isLoaded, error }) => {
  return (
    <div className="mt-4 text-white">
      <input
        className="form-control bg-transparent border-light text-white d-sm-none d-block"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchMovie}
        onChange={(e) => handleChange(e.target.value)}
      />
      {error ? (
        <h4 className="text-center mt-5">Error: {error}</h4>
      ) : (
        <>
          {!isLoaded ? (
            <h4 className="text-center mt-5">Loading...</h4>
          ) : (
            <Movies items={data} />
          )}
        </>
      )}
    </div>
  );
};

export default MoviesContainer;
