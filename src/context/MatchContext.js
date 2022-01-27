import { createContext, useState } from "react";
import { data } from "../data";

export const MatchContext = createContext();

export const MatchProvider = (props) => {
  const [match, setMatch] = useState(data);

  return (
    <MatchContext.Provider value={{ match, setMatch }}>
      {props.children}
    </MatchContext.Provider>
  );
};
