import { response } from "../../config/response";
import { status } from "../../config/responseStatus";
import { joinStore, addReview } from "../services/storeService";

export const storeAdd = async (req, res, next) => {
  console.log("가게 추가를 요청하였습니다.");
  console.log("Controll body:", req.body);
  try {
    const result = await joinStore(req.body);
    console.log('Store added result:', result); // result 값 확인
    res.status(200).send(response(status.SUCCESS, result)); // 상태 코드를 200로 설정
  } catch (error) {
    console.error("Error adding store:", error); // 에러 로그 출력
    res.status(error.data?.status || 500).send(response(error, null)); // 상태 코드 설정
  }
};

export const addStoreReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청하였습니다.");
  console.log("Request body:", req.body);
  try {
    const result = await addReview(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(400).send({
      status: 400,
      isSuccess: false,
      code: "COMMON001",
      message: "잘못된 요청입니다."
    });
  }
};
