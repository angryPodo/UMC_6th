export const storeAddResponseDTO = (store) => {
  return {
    id: store.id,
    region_id: store.region_id,
    name: store.name,
    address: store.address,
    star_rating: store.star_rating
  };
};
