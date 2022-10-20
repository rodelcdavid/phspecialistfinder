import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

const FilterChip = ({ filterList }) => {
  const { setProvince, setMunicipality, setSpecialty } =
    useContext(FilterContext);

  const handleOnDelete = (filterCategory) => {
    switch (filterCategory) {
      case 0:
        setProvince("");
        break;
      case 1:
        setMunicipality("");
        break;
      case 2:
        setSpecialty("");
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {filterList.map((filter, i) => {
        if (filter.length) {
          return (
            <Chip
              key={i}
              label={filter}
              variant="outlined"
              color="primary"
              onDelete={() => handleOnDelete(i)}
              sx={{
                "& svg": {
                  fill: "#d32f2f",
                },
              }}
            ></Chip>
          );
        }
      })}
    </Box>
  );
};

export default FilterChip;
