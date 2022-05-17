import React from "react";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

const TableData = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 850 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Region
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Area
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, region, area }) => (
            <TableRow key={name}>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center">{region}</TableCell>
              <TableCell align="center">{area}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
