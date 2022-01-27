import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { MatchContext } from "../context/MatchContext";

const Results = ({ data }) => {
  const { match } = useContext(MatchContext);

  const [visible, setVisible] = useState(match.length > 20 ? 20 : match.length);
  const displayMatch = match.slice(0, visible);

  const handleGoogleSearch = (fullname) => {
    window.open("http://google.com/search?q=" + fullname);
  };

  const handleLoadMore = () => {
    match.length - visible >= 20
      ? setVisible((prev) => prev + 20)
      : setVisible(match.length);
  };

  const rowData = displayMatch.map((entry) => {
    let id, fullname, specialty, municipality, province;
    if (entry.length === 9) {
      id = entry[0];
      fullname = `${entry[1]} ${entry[2]} ${entry[3]}`;
      specialty = entry[4];
      municipality = entry[5];
      province = entry[6];
    } else if (entry.length === 10) {
      id = entry[0];
      fullname = `${entry[1]} ${entry[2]} ${entry[3]} ${entry[4]}`;
      specialty = entry[5];
      municipality = entry[6];
      province = entry[7];
    } else {
      id = entry[0];
      fullname = `${entry[1]} ${entry[2]} ${entry[3]} ${entry[4]} ${entry[5]}`;
      specialty = entry[6];
      municipality = entry[7];
      province = entry[8];
    }
    return { id, fullname, specialty, municipality, province };
  });

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
          <p>
            <em>Nothing to show.</em>
          </p>
          <p>
            <em>Please set search criteria first</em>
          </p>
        </Box>
      ) : (
        <>
          <TableContainer
            // component={Paper}
            sx={{
              paddingBottom: "0.5rem",
              border: "1px solid #aaa",
              // width: "90vw",
              margin: "1rem auto",
              // boxShadow: 2,
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
          >
            <Table
              sx={{
                minWidth: 650,
                // boxShadow: "0 0 10px rgba(0,0,0,0.23)",

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
                {rowData.map((entry) => (
                  <TableRow
                    key={entry.id}
                    onClick={() => handleGoogleSearch(entry.fullname)}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ padding: "1rem" }}>
                <em>
                  {match.length !== 0
                    ? `- Showing ${visible} out of ${match.length} results -`
                    : "No results found."}
                </em>
              </p>
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
            </div>
          </TableContainer>
        </>
      )}
    </>
  );

  //   return (
  //     <>
  //       {/* <p style={{ textAlign: "center" }}>
  //         {match.length === data.length ? "-" : `Found: ${match.length}`}
  //       </p> */}
  //       <Box
  //         sx={{
  //           padding: "0 1rem",
  //           margin: "1rem auto",
  //           width: "100%",
  //           overflowX: "auto",
  //           border: "2px solid #000",
  //         }}
  //       >
  //         <div
  //           style={{
  //             display: "flex",
  //             fontWeight: "bolder",
  //             borderBottom: "1px solid black",
  //           }}
  //         >
  //           <span style={{ width: "80px" }}> </span>
  //           <span style={{ width: "400px" }}>FULL NAME</span>
  //           <span style={{ width: "300px" }}>SPECIALTY</span>
  //           <span style={{ width: "200px" }}>MUNICIPALITY</span>
  //           <span style={{ width: "200px" }}>PROVINCE</span>
  //         </div>
  //         {match.length === data.length ? (
  //           <p style={{ textAlign: "center" }}>
  //             <em>Please set search criteria first.</em>
  //           </p>
  //         ) : (
  //           <>
  //             {rowData.map((entry, i) => {
  //               return (
  //                 //CHange this to table

  //                 <Box
  //                   sx={{
  //                     display: "flex",
  //                     cursor: "pointer",
  //                     transition: "all 150ms ease-in",
  //                     "&:hover": {
  //                       backgroundColor: "rgba(0,0,0,0.2)",
  //                       fontWeight: "bolder",
  //                     },
  //                   }}
  //                   key={i}
  //                   onClick={() => handleGoogleSearch(entry.fullname)}
  //                 >
  //                   <span style={{ width: "80px" }}>{entry.id}</span>
  //                   <span style={{ width: "400px" }}>{entry.fullname}</span>
  //                   <span style={{ width: "300px" }}>{entry.specialty} </span>
  //                   <span style={{ width: "200px" }}>{entry.municipality} </span>
  //                   <span style={{ width: "200px" }}>{entry.province} </span>
  //                 </Box>
  //               );
  //             })}
  //             <div
  //               style={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <p>
  //                 <em>
  //                   - Showing {visible} out of {match.length} -
  //                 </em>
  //               </p>
  //               {match.length > 20 && visible != match.length && (
  //                 <button
  //                   style={{
  //                     width: "200px",
  //                     margin: "0 auto",
  //                     padding: "0.5rem",
  //                     cursor: "pointer",
  //                   }}
  //                   onClick={handleLoadMore}
  //                 >
  //                   Load more
  //                 </button>
  //               )}
  //             </div>
  //           </>
  //         )}
  //       </Box>
  //     </>
  //   );
};

export default Results;
