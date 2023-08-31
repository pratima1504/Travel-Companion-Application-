import axios from "axios";

export const getPlaces = async (type, sw, ne) => {
  const {
    data: { data },
  } = await axios.get(
    `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
    {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': 'a8e1db109amsh73ef43298769ec7p183e02jsn76e6709237b6',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    }
  );

  return data;
};
