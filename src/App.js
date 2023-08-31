import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomeMap from "./components/HomeMap";
import PlaceInfo from "./components/PlaceInfo";
import { getPlaces } from "./components/APIs";

function App() {
  const [coordinates, setCoordinates] = useState();
  const [places, setPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (bounds) {
        setIsLoading(true);
        getPlaces(type, bounds.sw, bounds.ne).then((data) => {
          setPlaces(
            data.filter((place) => place.name && place.num_reviews > 0)
          );
          setFilteredPlaces([]);
          setIsLoading(false);
        });
      }
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [coordinates, bounds, type]);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  return (
    <>
      <Header />
      <main>
        <PlaceInfo
          isLoading={isLoading}
          places={filteredPlaces.length ? filteredPlaces : places}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
        />
        <HomeMap
          setBounds={setBounds}
          places={filteredPlaces.length ? filteredPlaces : places}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
      </main>
    </>
  );
}

export default App;
