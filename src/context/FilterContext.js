import { createContext, useState } from "react";

//YOU CREATED FILTERCONTEXT BC YOU HAVE TO ACCESS THE STATES IN FILTERMENUMOBILE
//ANY OTHER SOLUTIONS FOR THIS?
export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [province, setProvince] = useState(""); //Filter context
  const [specialty, setSpecialty] = useState(""); //Filter context
  const [municipality, setMunicipality] = useState(""); //Filter

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
