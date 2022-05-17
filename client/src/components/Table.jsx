import React, { Fragment } from "react";

const Table = ({ data }) => {
  return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, region, area }) => (
            <Fragment key={id}>
              <tr>
                <td style={{fontWeight: 700}}>{name}</td>
              </tr>
              <tr>
                <td>{region}</td>
              </tr>
              <tr>
                <td>{area}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
  );
};

export default Table;