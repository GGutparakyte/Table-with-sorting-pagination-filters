import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import Pagination from "./components/Pagination";

const App = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const LITHUANIA_AREA = 65300;

  //get current records
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const sortByName = (name) => {
    if (order === "ASC") {
      const sortedASC = [...data].sort((a, b) =>
        a[name].toLowerCase() > b[name].toLowerCase() ? 1 : -1
      );
      setData(sortedASC);
      setOrder("DSC");
    } else if (order === "DSC") {
      const sortedDSC = [...data].sort((a, b) =>
        a[name].toLowerCase() < b[name].toLowerCase() ? 1 : -1
      );
      setData(sortedDSC);
      setOrder("ASC");
    }
    return 0;
  };
  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // next & prev buttons change
  const maxPage = Math.min(data.length / postsPerPage);
  const goToNextPage = () => setCurrentPage(currentPage + 1, maxPage);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1, 1);

  const filterCountriesByArea = () => {
    const filterByArea = data
      .sort((a, b) => (a.area > b.area ? 1 : -1))
      .filter((country) => country.area > LITHUANIA_AREA);
    setData(filterByArea);
  };

  const filterOceaniaCountries = () => {
    const filterByOceaniaRegion = data.filter(
      (country) => country.region === "Oceania"
    );
    setData(filterByOceaniaRegion);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://restcountries.com/v2/all?fields=name,region,area"
        );
        setData(data);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  return (
    <div>
      <form>
        <button type="button" onClick={() => filterCountriesByArea()}>
          Filter By Area
        </button>
        <button type="button" onClick={() => filterOceaniaCountries()}>
          Filter Countries From Oceania Region
        </button>
        <button type="button" onClick={() => sortByName("name")}>
          Sort by Name{" "}
          {order === "ASC" ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />}
        </button>
        <Table data={currentPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </form>
    </div>
  );
};

export default App;
