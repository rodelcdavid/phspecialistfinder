import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [province, setProvince] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [municipality, setMunicipality] = useState("");

  return (
    <FilterContext.Provider
      value={{
        province,
        specialty,
        municipality,
        setProvince,
        setSpecialty,
        setMunicipality,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
