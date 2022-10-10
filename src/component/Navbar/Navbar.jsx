import React from "react";
import logo from "../../assets/movie.png";

const Navbar = ({ searchMovie, handleChange, handleFilter }) => {
  const ratings = ["6", "7", "8", "9", "10"];
  const year = new Date().getFullYear();
  const years = Array.from(new Array(5), (val, index) => year - index);

  return (
    <nav className="navbar shadow-sm navbar-expand-lg navbar-dark bg-transparent py-4">
      <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="" width="32" height="32" />
        </a>
        <div className="d-flex justify-content-end align-items-center gap-2">
          <input
            className="form-control bg-transparent border-light text-white d-sm-block d-none"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchMovie}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-dark shadow dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              Filter
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start px-3 mt-3 bg-dark text-white shadow">
              <li>
                <h6 className="fw-normal">Ratings</h6>
              </li>
              {ratings.map((rating, key) => {
                return (
                  <li className="form-check" key={key}>
                    <input
                      className="form-check-input cursor-pointer"
                      type="checkbox"
                      name={rating}
                      id="flexCheckDefault"
                      onChange={handleFilter}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {rating}
                    </label>
                  </li>
                );
              })}
              <li>
                <hr className="dropdown-divider bg-light" />
                <h6 className="fw-normal">Released</h6>
              </li>
              {years.map((year, key) => {
                return (
                  <li className="form-check" key={key}>
                    <input
                      className="form-check-input cursor-pointer"
                      type="checkbox"
                      name={year}
                      onChange={handleFilter}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {year}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
