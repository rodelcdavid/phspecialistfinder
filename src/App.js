import { useState, useEffect, useMemo, useCallback } from "react";
import FilterMenu from "./components/FilterMenu";
import Results from "./components/Results";
import { data } from "./data";

//TODO: Fix the lag (add load more, or infinite scroll, or react lazy)
//TODO: Turn into table
//TODO:

function App() {
  const [match, setMatch] = useState(data);
  const [province, setProvince] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [municipality, setMunicipality] = useState("");

  const [loading, setLoading] = useState(false);

  // const getFilterData = useCallback(() => {}, []);

  // const filterArrays = useMemo(() => {
  //   return data.map((item) => {
  //     const itemProvince = item[item.length - 3];
  //     const itemSpecialty = item[item.length - 5];

  //     let itemMunicipality;
  //     if (itemProvince === province) {
  //       itemMunicipality = item[item.length - 4];
  //     }

  //     return [itemProvince, itemSpecialty, itemMunicipality];
  //   });
  // }, []);

  // console.log(filterArrays.map((item) => item[0]));

  //Get filter data
  const provinceArray = useMemo(() => {
    console.log("province array");

    return data.map((item) => {
      return item[item.length - 3];
    });
  }, []);

  const specialtyArray = useMemo(() => {
    console.log("specialty array");
    return data.map((item) => {
      return item[item.length - 5];
    });
  }, []);

  const municipalityArray = useMemo(() => {
    console.log("municipality array");
    return data
      .filter((item) => item[item.length - 3] === province)
      .map((item) => {
        return item[item.length - 4];
      });
  }, [province]);

  //Find unique values
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueProvince = provinceArray.filter(onlyUnique).sort();
  const uniqueSpecialty = specialtyArray.filter(onlyUnique).sort();
  const uniqueMunicipality = municipalityArray.filter(onlyUnique).sort();

  // Handlers

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setMunicipality("");
  };
  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const handleMunicipalityChange = (e) => {
    setMunicipality(e.target.value);
  };

  const handleGoogleSearch = (fullname) => {
    window.open("http://google.com/search?q=" + fullname);
  };

  useEffect(() => {
    let result = data;

    if (province.length) {
      setLoading(true);
      result = result.filter((item) => item[item.length - 3] === province);
    }

    if (specialty.length) {
      setLoading(true);

      result = result.filter((item) => item[item.length - 5] === specialty);
    }

    if (municipality.length) {
      setLoading(true);

      result = result.filter((item) => item[item.length - 4] === municipality);
    }

    setTimeout(() => {
      setLoading(false);
      setMatch(result);
    }, 200);
  }, [province, specialty, municipality]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>PH Medical Specialist Finder</h1>
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
      <Results
        data={data}
        match={match}
        handleGoogleSearch={handleGoogleSearch}
      />
    </>
  );
}

export default App;
