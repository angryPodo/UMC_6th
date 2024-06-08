import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { storeAddResponseDTO } from '../dtos/storeDTO';
import { addStore } from "../models/storeDao";

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
