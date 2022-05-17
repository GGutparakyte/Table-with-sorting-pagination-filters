import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";

const App = () => {
const [data, setData] = useState([]);
const [order, setOrder] = useState('ASC');

const sortByName = (name) => {
    if (order === 'ASC') {
      const sortedASC = [...data].sort((a, b) => a[name].toLowerCase() > b[name].toLowerCase() ? 1 : -1)
      setData(sortedASC);
      setOrder('DSC');
    } else if (order === 'DSC') {
      const sortedDSC = [...data].sort((a, b) => a[name].toLowerCase() < b[name].toLowerCase() ? 1 : -1)
      setData(sortedDSC);
      setOrder('ASC');
    }
    return 0;
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios
          .get("https://restcountries.com/v2/all?fields=name,region,area")
        setData(data);
      } catch (error) {
        throw new Error(error)
      }
    })()
  }, []);

  return (
    <div>
        <form>
        <button
          type="button"
          onClick={() => sortByName('name')}>
          Sort by Name {order === 'ASC' ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />}
        </button>
        <Table data={data} />
      </form >
    </div >
  );
};

export default App;