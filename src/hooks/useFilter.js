import { useContext, useEffect } from "react";
import { FilterContext } from "../context/FilterContext";
import { MatchContext } from "../context/MatchContext";
import { data } from "../data";

export const useFilter = () => {
  const { province, municipality, specialty } = useContext(FilterContext);

  const { setMatch } = useContext(MatchContext);

  useEffect(() => {
    let result = data;

    if (province.length) {
      // setLoading(true);
      result = result.filter((item) => item[6] === province);
    }

    if (specialty.length) {
      // setLoading(true);

      result = result.filter((item) => item[4] === specialty);
    }

    if (municipality.length) {
      // setLoading(true);

      result = result.filter((item) => item[5] === municipality);
    }

    // //Matched Results
    // useEffect(() => {
    //   let result = data;

    //   if (province.length) {
    //     // setLoading(true);
    //     result = result.filter((item) => item[item.length - 3] === province);
    //   }

    //   if (specialty.length) {
    //     // setLoading(true);

    //     result = result.filter((item) => item[item.length - 5] === specialty);
    //   }

    //   if (municipality.length) {
    //     // setLoading(true);

    //     result = result.filter((item) => item[item.length - 4] === municipality);
    //   }

    //move to a parent ? or context ? or app.js?

    //initial match length should be 0
    setTimeout(() => {
      // setLoading(false);
      setMatch(result);
    }, 200);
  }, [province, specialty, municipality]);
};
