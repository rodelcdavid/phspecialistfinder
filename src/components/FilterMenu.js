import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import { FilterContext } from "../context/FilterContext";
import { MatchContext } from "../context/MatchContext";

const FilterMenu = ({ data }) => {
  const {
    province,
    municipality,
    specialty,
    setProvince,
    setMunicipality,
    setSpecialty,
  } = useContext(FilterContext);

  const { setMatch } = useContext(MatchContext);

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

  useEffect(() => {
    let result = data;

    if (province.length) {
      // setLoading(true);
      result = result.filter((item) => item[item.length - 3] === province);
    }

    if (specialty.length) {
      // setLoading(true);

      result = result.filter((item) => item[item.length - 5] === specialty);
    }

    if (municipality.length) {
      // setLoading(true);

      result = result.filter((item) => item[item.length - 4] === municipality);
    }

    setTimeout(() => {
      // setLoading(false);
      setMatch(result);
    }, 200);
  }, [province, specialty, municipality]);

  return (
    <Box
      sx={{
        width: "60%",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",

        "@media (min-width:1000px)": {
          margin: "1rem auto 0",
          gap: "3rem",
          flexDirection: "row",
        },
      }}
    >
      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Province</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={province}
          label="Province"
          onChange={(e) => {
            setProvince(e.target.value);
            setMunicipality("");
          }}
        >
          <MenuItem value="">-</MenuItem>
          {uniqueProvince.map((item, i) => {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={municipality}
          label="Municipality"
          onChange={(e) => setMunicipality(e.target.value)}
        >
          <MenuItem value="">-</MenuItem>
          {uniqueMunicipality.map((item, i) => {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Specialty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={specialty}
          label="Specialty"
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <MenuItem value="">-</MenuItem>

          {uniqueSpecialty.map((item, i) => {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterMenu;
