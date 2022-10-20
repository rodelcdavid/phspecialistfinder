import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { MatchContext } from "../context/MatchContext";
import { FilterContext } from "../context/FilterContext";
import { data } from "../data";

const Results = () => {
  const { match } = useContext(MatchContext);
  const { specialty, municipality, province } = useContext(FilterContext);

  const tableRef = useRef();

  //Load more results
  const [visible, setVisible] = useState(match.length > 20 ? 20 : match.length);
  const visibleMatch = match.slice(0, visible);
  const handleLoadMore = () => {
    match.length - visible >= 20
      ? setVisible((prev) => prev + 20)
      : setVisible(match.length);
  };

  const rowDisplay = visibleMatch.map((entry) => {
    const id = entry[0];
    const fullname = `${entry[1]} ${entry[2]} ${entry[3]}`;
    const specialty = entry[4];
    const municipality = entry[5];
    const province = entry[6];

    return { id, fullname, specialty, municipality, province };
  });

  const handleGoogleSearch = (fullname) => {
    window.open("http://google.com/search?q=" + fullname);
  };

  //Table scrolls to top when filter changes
  useEffect(() => {
    setTimeout(() => {
      tableRef.current?.scrollTo(0, 0);
    }, 200);
  }, [specialty, municipality, province]);

  useEffect(() => {
    match.length > 20 ? setVisible(20) : setVisible(match.length);
  }, [match]);

  return (
    <>
      {match.length === data.length ? (
        <Box
          sx={{
            marginTop: "1rem",
            border: "1px solid #aaa",
            height: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#444",
          }}
        >
          <Typography
            sx={{ fontStyle: "italic", textAlign: "center" }}
            variant="body1"
          >
            Nothing to show.
            <br />
            Please set search criteria first.
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer
            sx={{
              paddingBottom: "0.5rem",
              border: "1px solid #aaa",
              margin: "1rem auto",
              overflow: "auto",
              height: "75%",

              "&::-webkit-scrollbar": {
                height: "7px",
                width: "7px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
              },
            }}
            ref={tableRef}
          >
            <Table
              sx={{
                minWidth: 650,

                "& > thead > tr > th": {
                  fontWeight: 800,
                },
                "& > tbody > tr:hover": {
                  backgroundColor: "#1769aa",
                  cursor: "pointer",

                  "& td": {
                    color: "#fff",
                  },
                },
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>FULL NAME</TableCell>
                  <TableCell>SPECIALTY</TableCell>
                  <TableCell>MUNICIPALITY</TableCell>
                  <TableCell>PROVINCE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowDisplay.map((entry) => (
                  <TableRow
                    key={entry.id}
                    onClick={() => handleGoogleSearch(entry.fullname)}
                  >
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{entry.fullname}</TableCell>
                    <TableCell>{entry.specialty}</TableCell>
                    <TableCell>{entry.municipality}</TableCell>
                    <TableCell>{entry.province}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "75%",
                color: "#444",
              }}
            >
              <Typography
                sx={{ fontStyle: "italic", padding: "1rem" }}
                variant="body1"
              >
                {match.length !== 0
                  ? `- Showing ${visible} out of ${match.length} results -`
                  : "No results found."}
              </Typography>
              {match.length > 20 && visible !== match.length && (
                <Button
                  variant="contained"
                  sx={{
                    width: "300px",
                    margin: "0 auto",
                  }}
                  onClick={handleLoadMore}
                >
                  Load more
                </Button>
              )}
            </Box>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Results;
