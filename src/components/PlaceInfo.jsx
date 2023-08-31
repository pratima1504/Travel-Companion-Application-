import React from "react";
import SinglePlace from "./SinglePlace";

function PlaceInfo({ isLoading, places, type, setType, rating, setRating }) {
  return (
    <section className="placeInfo">
      <h1>Restaurants, Hotels & Attractions around you</h1>

      <div className="filters">
        <label htmlFor="type">Type</label>
        <div>
          <select
            name="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
          <select
            name="rating"
            value={rating}
            onChange={(e) => {
              setRating(Number(e.target.value));
            }}
          >
            <option value={0}>All</option>
            <option value={3}>Above 3.0</option>
            <option value={4}>Above 4.0</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <div className="places">
          {places.map((place, i) => {
            return <SinglePlace key={i} place={place} />;
          })}
        </div>
      )}
    </section>
  );
}

export default PlaceInfo;
