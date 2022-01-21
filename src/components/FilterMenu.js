import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const FilterMenu = ({
  province,
  municipality,
  specialty,
  uniqueMunicipality,
  uniqueProvince,
  uniqueSpecialty,
  handleMunicipalityChange,
  handleProvinceChange,
  handleSpecialtyChange,
}) => {
  return (
    <Box
      sx={{
        width: "60%",
        display: "flex",
        gap: "3rem",
        margin: "0 auto",
      }}
    >
      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Province</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={province}
          label="Province"
          onChange={handleProvinceChange}
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
          onChange={handleMunicipalityChange}
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
          onChange={handleSpecialtyChange}
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
