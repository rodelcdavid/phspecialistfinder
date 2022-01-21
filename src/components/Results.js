import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const Results = ({ data, match, handleGoogleSearch }) => {
  const [visible, setVisible] = useState(match.length > 20 ? 20 : match.length);
  const displayMatch = match.slice(0, visible);

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
      {/* <p style={{ textAlign: "center" }}>
        {match.length === data.length ? "-" : `Found: ${match.length}`}
      </p> */}
      <Box
        sx={{
          padding: "0 1rem",
          margin: "1rem auto",
          width: "100%",
          overflowX: "auto",
          border: "2px solid #000",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: "bolder",
            borderBottom: "1px solid black",
          }}
        >
          <span style={{ width: "80px" }}> </span>
          <span style={{ width: "400px" }}>FULL NAME</span>
          <span style={{ width: "300px" }}>SPECIALTY</span>
          <span style={{ width: "200px" }}>MUNICIPALITY</span>
          <span style={{ width: "200px" }}>PROVINCE</span>
        </div>
        {match.length === data.length ? (
          <p style={{ textAlign: "center" }}>
            <em>Please set search criteria first.</em>
          </p>
        ) : (
          <>
            {rowData.map((entry, i) => {
              return (
                //CHange this to table

                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    transition: "all 150ms ease-in",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      fontWeight: "bolder",
                    },
                  }}
                  key={i}
                  onClick={() => handleGoogleSearch(entry.fullname)}
                >
                  <span style={{ width: "80px" }}>{entry.id}</span>
                  <span style={{ width: "400px" }}>{entry.fullname}</span>
                  <span style={{ width: "300px" }}>{entry.specialty} </span>
                  <span style={{ width: "200px" }}>{entry.municipality} </span>
                  <span style={{ width: "200px" }}>{entry.province} </span>
                </Box>
              );
            })}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>
                <em>
                  - Showing {visible} out of {match.length} -
                </em>
              </p>
              {match.length > 20 && visible != match.length && (
                <button
                  style={{
                    width: "200px",
                    margin: "0 auto",
                    padding: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={handleLoadMore}
                >
                  Load more
                </button>
              )}
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default Results;
