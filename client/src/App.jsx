import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TableData from "./components/Table";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import PaginationButtons from "./components/Pagination";
import { Box, Button, CssBaseline } from "@mui/material";

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
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50vw",
          m: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            type="button"
            onClick={() => filterCountriesByArea()}
          >
            Filter By Area
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => filterOceaniaCountries()}
          >
            Filter Countries From Oceania Region
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => sortByName("name")}
          >
            Sort by Name{" "}
            {order === "ASC" ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />}
          </Button>
        </Box>
        <TableData data={currentPosts} />
        <PaginationButtons
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </Box>
    </>
  );
};

export default App;
