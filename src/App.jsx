import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Movie, MoviesContainer, Navbar } from "./component";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const onlyTag = ["release_date", "vote_average"];
  const handleChange = (value) => {
    setSearchMovie(value);
  };
  const handleFilter = (e) => {
    const { name, checked } = e.target;
    const lowerCaseVal = name.toLowerCase().trim();
    if (!checked || lowerCaseVal === null) {
      return console.log("No data");
    } else if (lowerCaseVal > 0 && lowerCaseVal <= 10) {
      const filteredRating = dataSearch.filter((tag) => {
        return Object.keys(tag).some((key) => {
          return onlyTag[1].includes(key)
            ? tag[key]?.toString().toLowerCase().includes(lowerCaseVal) || ""
            : false;
        });
      });
      setData(filteredRating);
    } else {
      const filteredYear = dataSearch.filter((tag) => {
        return Object.keys(tag).some((key) => {
          return onlyTag[0].includes(key)
            ? tag[key]?.toString().toLowerCase().includes(lowerCaseVal) || ""
            : false;
        });
      });
      setData(filteredYear);
    }
  };

  useEffect(() => {
    if (searchMovie === "") {
      fetch("https://movie-task.vercel.app/api/popular?page=1")
        .then((res) => res.json())
        .then(
          (response) => {
            setIsLoaded(true);
            setData(response.data.results);
            setDataSearch(response.data.results);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      fetch(
        `https://movie-task.vercel.app/api/search?page=1&query=${searchMovie}`
      )
        .then((res) => res.json())
        .then(
          (response) => {
            setIsLoaded(true);
            setDataSearch(response.data.results);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }

    if (!dataSearch) {
      setData(data);
    } else {
      setData(dataSearch);
    }
  }, [searchMovie]);

  return (
    <section className="container-sm">
      <Navbar
        handleChange={handleChange}
        searchMovie={searchMovie}
        handleFilter={handleFilter}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MoviesContainer data={data} isLoaded={isLoaded} error={error} handleChange={handleChange} searchMovie={searchMovie} />
          }
        />
        <Route exact path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </section>
  );
}

export default App;
