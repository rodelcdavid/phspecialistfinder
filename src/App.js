import { Tune } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useMemo, useCallback } from "react";
import FilterChip from "./components/FilterChip";
import FilterMenu from "./components/FilterMenu";
import FilterMenuMobile from "./components/FilterMenuMobile";
import Footer from "./components/Footer";
import Results from "./components/Results";
import { data } from "./data";
import globalStyle from "./globalStyle";

//TODO: Empty table
//TODO: Filter icon on mobile

function App() {
  const [match, setMatch] = useState(data);
  const [province, setProvince] = useState(""); //Filter context
  const [specialty, setSpecialty] = useState(""); //Filter context
  const [municipality, setMunicipality] = useState(""); //Filter Context

  const [loading, setLoading] = useState(false);

  //TODO: Move to filter menu component OR to utils
  //Get filter data
  const provinceArray = useMemo(() => {
    return data.map((item) => {
      return item[item.length - 3];
    });
  }, []);

  const specialtyArray = useMemo(() => {
    return data.map((item) => {
      return item[item.length - 5];
    });
  }, []);

  const municipalityArray = useMemo(() => {
    return data
      .filter((item) => item[item.length - 3] === province)
      .map((item) => {
        return item[item.length - 4];
      });
  }, [province]);

  //Find unique values
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueProvince = provinceArray.filter(onlyUnique).sort();
  const uniqueSpecialty = specialtyArray.filter(onlyUnique).sort();
  const uniqueMunicipality = municipalityArray.filter(onlyUnique).sort();

  // Handlers

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setMunicipality("");
  };
  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const handleMunicipalityChange = (e) => {
    setMunicipality(e.target.value);
  };

  const handleGoogleSearch = (fullname) => {
    window.open("http://google.com/search?q=" + fullname);
  };

  useEffect(() => {
    let result = data;

    if (province.length) {
      setLoading(true);
      result = result.filter((item) => item[item.length - 3] === province);
    }

    if (specialty.length) {
      setLoading(true);

      result = result.filter((item) => item[item.length - 5] === specialty);
    }

    if (municipality.length) {
      setLoading(true);

      result = result.filter((item) => item[item.length - 4] === municipality);
    }

    setTimeout(() => {
      setLoading(false);
      setMatch(result);
    }, 200);
  }, [province, specialty, municipality]);

  const large = useMediaQuery("(min-width:1000px)");
  return (
    <>
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
        {large ? (
          <FilterMenu
            province={province}
            municipality={municipality}
            specialty={specialty}
            uniqueMunicipality={uniqueMunicipality}
            uniqueProvince={uniqueProvince}
            uniqueSpecialty={uniqueSpecialty}
            handleMunicipalityChange={handleMunicipalityChange}
            handleProvinceChange={handleProvinceChange}
            handleSpecialtyChange={handleSpecialtyChange}
          />
        ) : (
          <FilterMenuMobile
            province={province}
            municipality={municipality}
            specialty={specialty}
            setProvince={setProvince}
            setMunicipality={setMunicipality}
            setSpecialty={setSpecialty}
            uniqueMunicipality={uniqueMunicipality}
            uniqueProvince={uniqueProvince}
            uniqueSpecialty={uniqueSpecialty}
            handleMunicipalityChange={handleMunicipalityChange}
            handleProvinceChange={handleProvinceChange}
            handleSpecialtyChange={handleSpecialtyChange}
          />
        )}

        <Results
          data={data}
          match={match}
          handleGoogleSearch={handleGoogleSearch}
        />
      </Box>
      {/* <Footer /> */}
    </>
  );
}

export default App;
