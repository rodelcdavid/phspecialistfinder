import { createContext, useState } from "react";
import filterReducer from "./filterReducer";

const initialState = {
  filters: { 
    province: "",
    municipality: "",
    specialty: "",
  }

};

export const FilterContext = createContext(initialState);

export const FilterProvider = (props) => {
  const [province, setProvince] = useState(""); //Filter context
  const [specialty, setSpecialty] = useState(""); //Filter context
  const [municipality, setMunicipality] = useState(""); //Filter Context

const [state, dispatch] = useReducer(filterReducer, initialState);

const 

  return (
    <FilterContext.Provider
      value={{
     filters: state.filters
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
