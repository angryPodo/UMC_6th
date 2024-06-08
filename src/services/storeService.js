import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { storeAddResponseDTO, reviewResponseDTO } from '../dtos/storeDTO';  // reviewResponseDTO 가져오기
import { addStore, addReviewToDB } from "../models/storeDao";

export const joinStore = async (body) => {
  const joinStoreData = await addStore({
    region_id: body.region_id,
    name: body.name,
    address: body.address,
    star_rating: body.star_rating
  });

  if (joinStoreData === -1) {
    throw new BaseError(status.STORENAME_ALREADY_EXIST);
  }
  console.log('joinStoreData:', joinStoreData); // joinStoreData 값 확인
  return storeAddResponseDTO({
    id: joinStoreData,
    region_id: body.region_id,
    name: body.name,
    address: body.address,
    star_rating: body.star_rating
  });
};

export const addReview = async (body) => {
  const reviewData = await addReviewToDB({
    store_id: body.store_id,
    user_id: body.user_id,
    review_body: body.body,
    star_rating: body.star_rating
  });

  if (reviewData === -1) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
  return reviewResponseDTO(reviewData);  // reviewResponseDTO 사용
};
