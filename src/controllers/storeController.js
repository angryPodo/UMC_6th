import { response } from "../../config/response";
import { status } from "../../config/responseStatus";
import { joinStore } from "../services/storeService";

export const storeAdd = async (req, res, next) => {
  console.log("가게 추가를 요청하였습니다.");
  console.log("Controll body:", req.body);
  try {
    const result = await joinStore(req.body);
    res.send(response(status.SUCCESS, result));
  } catch (error) {
    res.send(response(error, null));
  }
};
