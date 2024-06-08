import { response } from "../../config/response";
import { status } from "../../config/responseStatus";
import { addMission } from "../services/missionService";

export const addStoreMission = async (req, res, next) => {
  console.log("미션 추가를 요청하였습니다.");
  console.log("Request body:", req.body);
  try {
    const result = await addMission(req.body);
    res.status(200).send(response(status.SUCCESS, result));
  } catch (error) {
    console.error("Error adding mission:", error);
    if (error.data && error.data.code === status.MISSION_ALREADY_EXIXT.code) {
      res.status(409).send(response(status.MISSION_ALREADY_EXIXT, null));
    } else {
      res.status(400).send(response(status.BAD_REQUEST, null));
    }
  }
};
