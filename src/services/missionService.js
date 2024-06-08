import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { missionResponseDTO } from '../dtos/missionDTO';
import { addMissionToDB } from "../models/missionDao";

export const addMission = async (body) => {
  const missionData = await addMissionToDB({
    store_id: body.store_id,
    reward: body.reward,
    body: body.body
  });

  if (missionData === -1) {
    throw new BaseError(status.MISSION_ALREADY_EXIXT);
  }
  return missionResponseDTO(missionData);
};
