import { Tune } from "@mui/icons-material";
import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import { MatchContext } from "../context/MatchContext";
import FilterChip from "./FilterChip";
import FilterMenu from "./FilterMenu";

const FilterMenuMobile = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    province,
    municipality,
    specialty,
    setProvince,
    setMunicipality,
    setSpecialty,
  } = useContext(FilterContext);

  const { setMatch } = useContext(MatchContext);

  //CUSTOM HOOK??
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
          <FilterMenu data={data} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default FilterMenuMobile;
