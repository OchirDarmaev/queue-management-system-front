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
import { Auth, PubSub } from "aws-amplify";

export function Board() {
  const [rows, setRows] = useState<
    {
      memorableId: string;
      status: string;
      servicePointNumber: number;
    }[]
  >([]);
  const [userEmail, setUserEmail] = useState<string>("");

  const [testMsg, setTestMsg] = useState<string>("hello PubSub");

  useEffect(() => {
    (async () => {
      const user = await Auth.currentSession();
      const token = user.getIdToken().getJwtToken();
      const email = user.getIdToken().payload.email;
      setUserEmail(email);
      const res = await axios.get(API_HOST + "/queue/status", {
        headers: {
          Authorization:
            // todo
            "Bearer " + token,
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

  useEffect(() => {
    console.log("useEffect PubSub.subscribe");
    Auth.currentCredentials().then((info) => {
      const cognitoIdentityId = info.identityId;
      console.log("cognitoIdentityId", cognitoIdentityId);
    });

    const handleIncomingMessage = (data) => {
      setTestMsg(JSON.stringify(data.value));
    };

    const subscription = PubSub.subscribe(
      "queue-management-system/dev/test-topic"
    ).subscribe({
      next: handleIncomingMessage,
      error: (error) => console.error(error),
      close: () => console.log("Done"),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <TableContainer component={Paper}>
      <p>{userEmail}</p>
      <p>{testMsg}</p>
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
