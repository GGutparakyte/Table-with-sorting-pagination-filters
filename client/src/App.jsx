import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";

const App = () => {
  const [data, setData] = useState([]);


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
        <Table data={data} />
      </form >
    </div >
  );
};

export default App;