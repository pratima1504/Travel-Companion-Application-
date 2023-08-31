import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";
import StarRatings from "react-star-ratings";
import ReactDomServer from "react-dom/server";
import GestureHandling from "leaflet-gesture-handling";

function HomeMap({ setBounds, places, coordinates, setCoordinates }) {
  const [init, setInit] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const markerIcon = (name, photo, rating) =>
    L.divIcon({
      className: "markerIcon",
      html:
        "<div>" +
        `<h3>${name}</h3>` +
        `<img
            src=${photo}
            title=${name}
            alt=${name}
          />` +
        `${ReactDomServer.renderToString(
          <StarRatings
            rating={Number(rating)}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="1px"
          />
        )}` +
        "</div>",
    });

  const SetViewOnClick = () => {
    const map = useMapEvent("move", () => {
      const latLng = map.getBounds();

      setCoordinates(latLng._northEast);
      setBounds({ ne: latLng._northEast, sw: latLng._southWest });
    });

    return null;
  };

  const GestureHandler = () => {
    const map = useMap();
    map.gestureHandling.enable();
    map.addHandler("gestureHandling", GestureHandling);
    setInit(false);
    return null;
  };

  return (
    <section className="leaflet-container">
      {coordinates ? (
        <MapContainer center={coordinates} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map((place, i) =>
            window.screen.width >= 576 ? (
              <Marker
                key={i}
                position={
                  place.latitude && place.longitude
                    ? [place.latitude, place.longitude]
                    : coordinates
                }
                icon={markerIcon(
                  place.name,
                  place.photo
                    ? place.photo.images.large.url
                    : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
                  place.rating ? place.rating : ""
                )}
              ></Marker>
            ) : (
              <Marker
                key={i}
                position={
                  place.latitude && place.longitude
                    ? [place.latitude, place.longitude]
                    : coordinates
                }
              >
                <Popup>{place.name}</Popup>
              </Marker>
            )
          )}
          {init && window.screen.width <= 1200 && <GestureHandler />}
          <SetViewOnClick />
        </MapContainer>
      ) : (
        ""
      )}
    </section>
  );
}

export default HomeMap;
