import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Movie.css";
import tempBackdrop from "../../assets/tempPoster1280x720.png";

const Movie = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
      .then((res) => res.json())
      .then(
        (response) => {
          setIsLoaded(true);
          setData(response.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [id]);

  return (
    <div className="container-lg py-4">
      <div className="d-flex">
        <Link to="/" className="path-link">
          Home
        </Link>
        <span className="text-white mx-2">{"/"}</span>
        <p className="text-white">{data.title}</p>
      </div>
      {error ? (
        <h4 className="text-center text-white mt-5">Error : {error}</h4>
      ) : (
        <>
          {!isLoaded ? (
            <h4 className="text-center text-white mt-5">Loading...</h4>
          ) : (
            <div className="card my-2 bg-transparent border-0">
              <img
                src={
                  data.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
                    : tempBackdrop
                }
                className="card-img-top black-shadow"
                alt="..."
              />
              <div className="card-body mt-4">
                <div className="d-flex justify-content-between flex-wrap">
                  <div>
                    <h4 className="card-title text-white">{data.title}</h4>
                    <p className="text-white-50 fw-light">{data.tagline}</p>
                  </div>
                  <div>
                    <h4 className="text-light">
                      {" "}
                      Rating - {Math.round(data.vote_average * 10) / 10}/10
                    </h4>
                    <p className="text-light">
                      Language - {data.original_language ? "English" : ""}
                    </p>
                  </div>
                </div>

                <ul className="genres">
                  {data.genres?.map((item) => {
                    return (
                      <li className="genre text-light fst-italic" key={item.id}>
                        {item.name}
                      </li>
                    );
                  })}
                </ul>

                <hr className="text-white-50" />

                <p className="card-text text-light">{data.overview}</p>
                <hr className="text-white-50" />
                <p className="card-text d-flex justify-content-between flex-wrap">
                  <small className="text-light">
                    Running Time - {data.runtime} Minutes
                  </small>
                  <small className="text-light">
                    Budget -{" "}
                    {data.budget
                      ? `$${data.budget / 1000000} Million`
                      : "Not available"}
                  </small>
                  <small className="text-light">
                    Revenue -{" "}
                    {data.revenue
                      ? `$${data.revenue / 1000000} Million`
                      : "Not available"}
                  </small>
                  <small className="text-light">
                    Release Date - {data.release_date}
                  </small>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Movie;
