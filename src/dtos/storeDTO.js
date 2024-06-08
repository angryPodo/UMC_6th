export const storeAddResponseDTO = (store) => {
  return {
    id: store.id,
    region_id: store.region_id,
    name: store.name,
    address: store.address,
    star_rating: store.star_rating
  };
};

export const reviewResponseDTO = (review) => {
  return {
    id: review.id,
    store_id: review.store_id,
    user_id: review.user_id,
    body: review.body,
    star_rating: review.star_rating,
    created_at: review.created_at,
    updated_at: review.updated_at
  };
};
