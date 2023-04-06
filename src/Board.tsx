// endpoint curl --location 'http://localhost:3000/queue/status'
// response
// {
//   "itemsInQueue": [
//       {
//           "id": "01GX6VVGT09X67B25T92N2QFG2",
//           "serviceId": "01GX6VP5CVMB49PTENSPSA55YG",
//           "queueStatus": "queued",
//           "priority": "5",
//           "date": "2023-04-04T19:28:14.696Z",
//           "memorableId": "S-005"
//       },
//       {
//           "id": "01GX8E1EGTY1X17625DBNCBG41",
//           "serviceId": "01GX6VP5CVMB49PTENSPSA55YG",
//           "queueStatus": "queued",
//           "priority": "5",
//           "date": "2023-04-05T10:05:17.761Z",
//           "memorableId": "S-006"
//       },
//       {
//           "id": "01GX8E1KKN4N1MDZC2YST0VMMF",
//           "serviceId": "01GX6VP5CVMB49PTENSPSA55YG",
//           "queueStatus": "queued",
//           "priority": "5",
//           "date": "2023-04-05T10:05:22.969Z",
//           "memorableId": "S-007"
//       },
//       {
//           "id": "01GX6VV1JG65NRE5Z7DTHGNJN5",
//           "serviceId": "01GX6VPMED4FYBFPHNAHXH8TEH",
//           "queueStatus": "queued",
//           "priority": "5",
//           "date": "2023-04-04T19:27:59.100Z",
//           "memorableId": "R-001"
//       },
//       {
//           "id": "01GX8E1PDMR8B2ZP1TPX4E9NSW",
//           "serviceId": "01GX6VPMED4FYBFPHNAHXH8TEH",
//           "queueStatus": "queued",
//           "priority": "5",
//           "date": "2023-04-05T10:05:25.857Z",
//           "memorableId": "R-002"
//       },
//       {
//           "id": "01GX8E1S0C9G3GXB13Z6S87VNB",
//           "serviceId": "01GX6VPMED4FYBFPHNAHXH8TEH",
//           "queueStatus": "queued",
//           "priority": "5",
//           "date": "2023-04-05T10:05:28.495Z",
//           "memorableId": "R-003"
//       }
//   ],
//   "itemsInProgress": [
//       {
//           "servicePointNumber": "3",
//           "queueItem": {
//               "id": "01GX6VTQCWHR4XB8Q0WNVN179H",
//               "serviceId": "01GX6VP5CVMB49PTENSPSA55YG",
//               "queueStatus": "pending",
//               "priority": "5",
//               "date": "2023-04-04T19:27:48.697Z",
//               "memorableId": "S-004"
//           }
//       }
//   ]
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:3000/queue/status");
      const data = res.data;
      const itemsInProgress = data.items;
      const rows = itemsInProgress.map((item) => {
        return {
          memorableId:item.item.memorableId,
          status:item.item.queueStatus,
          servicePointNumber: item.servicePointNumber
        };
      });
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
