import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_HOST } from "./config";
import { config } from "aws-sdk";

export function Board() {
  const [rows, setRows] = useState<
    {
      memorableId: string;
      status: string;
      servicePointNumber: number;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(API_HOST + "/queue/status", {
        headers: {
          Authorization:
            // todo
            "Bearer xxxx",
        },
      });
      const data = res.data;
      const itemsInProgress = data.items;
      const rows = itemsInProgress.map(
        (item: {
          item: { memorableId: any; queueStatus: any };
          servicePointNumber: any;
        }) => {
          return {
            memorableId: item.item.memorableId,
            status: item.item.queueStatus,
            servicePointNumber: item.servicePointNumber,
          };
        }
      );
      setRows(rows);
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>status</TableCell>
            <TableCell align="right">Counter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`${row.memorableId} + ${row.servicePointNumber}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.memorableId}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>

              <TableCell align="right">{row.servicePointNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
