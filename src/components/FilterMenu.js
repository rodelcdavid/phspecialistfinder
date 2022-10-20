import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useMemo, useRef } from "react";
import { FilterContext } from "../context/FilterContext";
import { filters } from "../filters";
import { useFilter } from "../hooks/useFilter";

const FilterMenu = () => {
  const {
    province,
    municipality,
    specialty,
    setProvince,
    setMunicipality,
    setSpecialty,
  } = useContext(FilterContext);

  let provinceArray = useRef([]);
  let municipalityArray = useRef([]);
  useMemo(() => {
    filters.locations.forEach((location) => {
      if (!provinceArray.current.includes(location[0])) {
        provinceArray.current.push(location[0]);
      }
    });
  }, []);

  useMemo(() => {
    municipalityArray.current = [];
    filters.locations.forEach((location) => {
      if (province === location[0]) {
        municipalityArray.current.push(location[1]);
      }
    });
  }, [province]);

  const specialtyArray = filters.specialties;

  useFilter();

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

        "& > div": {
          width: "200px",
        },

        "@media (min-width:1000px)": {
          margin: "1rem auto 0",
          gap: "3rem",
          flexDirection: "row",
        },
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Province</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={province}
          label="Province"
          autoWidth
          onChange={(e) => {
            setProvince(e.target.value);
            setMunicipality("");
          }}
        >
          <MenuItem value="">-</MenuItem>
          {provinceArray.current.map((item, i) => {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
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
          {municipalityArray.current.map((item, i) => {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Specialty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={specialty}
          label="Specialty"
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <MenuItem value="">-</MenuItem>

          {specialtyArray.map((item, i) => {
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
