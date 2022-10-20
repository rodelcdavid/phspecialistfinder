import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import FilterMenu from "./components/FilterMenu";
import FilterMenuMobile from "./components/FilterMenuMobile";
import Results from "./components/Results";
import { FilterProvider } from "./context/FilterContext";
import { MatchProvider } from "./context/MatchContext";
import globalStyle from "./globalStyle";

function App() {
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
          height: "calc(100vh - 2rem)",
          minHeight: "550px",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginTop: "0.5rem",
            color: "#1769aa",
            fontWeight: 600,
            fontSize: "1.2rem",

            "@media (min-width: 450px)": {
              fontSize: "1.5rem",
            },
          }}
        >
          PH Medical Specialist Finder
        </Typography>
        <FilterProvider>
          {large ? <FilterMenu /> : <FilterMenuMobile />}

          <Results />
        </FilterProvider>
      </Box>
    </MatchProvider>
  );
}

export default App;
