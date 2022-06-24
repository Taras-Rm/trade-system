import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import React from "react";
import "./TradeInfo.scss";

function TradeInfo({
  totalBuyedPrice,
  totalSelledPrice,
  totalSelledCount,
  totalBuyedCount,
}) {
  return (
    <Table sx={{ maxWidth: 900 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            Count of sold goods
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            Count of bought goods
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            The amount of money earned
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            The amount of money spent
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          key={4}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            {totalSelledCount}
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            {totalBuyedCount}
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            {totalSelledPrice} $
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 20 }} align="center">
            {totalBuyedPrice} $
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default TradeInfo;
