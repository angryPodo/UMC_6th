import { response } from "../../config/response";
import { status } from "../../config/responseStatus";
import { joinStore } from "../services/storeService";

export const storeAdd = async (req, res, next) => {
  console.log("가게 추가를 요청하였습니다.");
  console.log("Controll body:", req.body);

  res.send(response(status.SUCCESS, await joinStore(req.body)));
};
