import { Tune } from "@mui/icons-material";
import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import React, { useState } from "react";
import FilterChip from "./FilterChip";
import FilterMenu from "./FilterMenu";

const FilterMenuMobile = ({
  province,
  municipality,
  specialty,
  setProvince,
  setMunicipality,
  setSpecialty,
  uniqueMunicipality,
  uniqueProvince,
  uniqueSpecialty,
  handleMunicipalityChange,
  handleProvinceChange,
  handleSpecialtyChange,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        marginTop: "1rem",
      }}
    >
      <IconButton
        sx={{ "&:hover": { color: "#1769aa" } }}
        aria-label="filter"
        onClick={() => setOpenDialog(true)}
      >
        <Tune />
      </IconButton>
      <FilterChip
        filterList={[province, municipality, specialty]}
        setProvince={setProvince}
        setMunicipality={setMunicipality}
        setSpecialty={setSpecialty}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ borderBottom: "1px solid #aaa", fontWeight: 800 }}>
          Set search criteria
        </DialogTitle>
        <Box sx={{ width: "20rem", padding: "1rem" }}>
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
        </Box>
      </Dialog>
    </Box>
  );
};

export default FilterMenuMobile;
