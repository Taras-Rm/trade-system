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
    <Table sx={{ maxWidth: 800 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            Count of selled goods
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            Count of buyed goods
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            Amount of money selled
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            Amount of money buyed
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          key={4}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            {totalSelledCount}
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            {totalBuyedCount}
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            {totalSelledPrice} $
          </TableCell>
          <TableCell style={{ color: "white", fontSize: 18 }} align="center">
            {totalBuyedPrice} $
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default TradeInfo;
