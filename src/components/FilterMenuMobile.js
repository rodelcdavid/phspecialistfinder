import { Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import FilterChip from "./FilterChip";
import FilterMenu from "./FilterMenu";
import { data } from "../data";
import { useFilter } from "../hooks/useFilter";

const FilterMenuMobile = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { province, municipality, specialty } = useContext(FilterContext);

  useFilter();

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
      <FilterChip filterList={[province, municipality, specialty]} />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Set search criteria</DialogTitle>
        <Divider />
        <Box
          sx={{
            padding: "1rem",
            width: "15rem",
            "@media (min-width: 450px)": {
              width: "20rem",
            },
          }}
        >
          <FilterMenu data={data} />
        </Box>
        <Divider />
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilterMenuMobile;
