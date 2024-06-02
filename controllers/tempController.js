import { status } from "../config/responseStatus";
import { getTempData, CheckFlag } from "../services/tempService";
import { response } from "../config/response";

export const tempTest = (req, res, next) => {
  res.send(response(status.SUCCESS, getTempData()))
};

export const tempException = (req, res, next) => {
  console.log("/temp/exception/" + req.params.flag);
  return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}