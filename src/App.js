import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FilterMenu from "./components/FilterMenu";
import FilterMenuMobile from "./components/FilterMenuMobile";
import Results from "./components/Results";
import { FilterProvider } from "./context/FilterContext";
import { MatchProvider } from "./context/MatchContext";
import { data } from "./data";
import globalStyle from "./globalStyle";

function App() {
  const [loading, setLoading] = useState(false);

  const large = useMediaQuery("(min-width:1000px)");
  return (
    <MatchProvider>
      {globalStyle}

      <Box
        sx={{
          backgroundColor: "#fff",
          margin: "0 auto",
          borderRadius: "10px",
          boxShadow: "0 5px 5px rgba(0,0,0,0.23)",
          padding: "1rem",
          // minHeight: "calc(100vh - 4rem)",
          width: "100%",
          height: "calc(100vh - 2rem)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: "0.5rem",
            color: "#1769aa",
            fontSize: "1.5rem",
          }}
        >
          PH Medical Specialist Finder
        </h1>
        <FilterProvider>
          {large ? (
            <FilterMenu data={data} />
          ) : (
            <FilterMenuMobile data={data} />
          )}
        </FilterProvider>

        <Results data={data} />
      </Box>
      {/* <Footer /> */}
    </MatchProvider>
  );
}

export default App;
