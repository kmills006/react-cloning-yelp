export const searchNearby = (google, map, request) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status, pagination) => {
      if (status === 'OK') resolve(results, pagination);

      reject(status);
    });
  });
};
