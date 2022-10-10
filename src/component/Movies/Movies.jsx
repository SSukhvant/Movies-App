import React from "react";
import { Link } from "react-router-dom";
import "./Movies.css";
import tempPoster from "../../assets/tempPoster800x1200.png";

const Movies = ({ items }) => {
  return (
    <div className="row">
      {items.map((index, key) => {
        return (
          <div className="col-lg-3 col-md-4 col-sm-6 g-4" key={key}>
            <Link to={`/movie/${index.id}`} className="text-decoration-none">
              <div className="card h-100 border-0 bg-transparent">
                <div className="overflow-hidden dark-shadow">
                  <img
                    src={
                      index.poster_path
                        ? `https://image.tmdb.org/t/p/original/${index.poster_path}`
                        : tempPoster
                    }
                    className="card-img-top card-img-hover rounded-3"
                    alt="Movie"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-white">{index.title}</h5>
                  <p className="card-text text-light">
                    Release Date - {index.release_date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
