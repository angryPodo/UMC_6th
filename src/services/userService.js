import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { signinResponseDTO } from "../dtos/userDTO";
import { addUser, getUser, getUserPreferToUserID, setPrefer } from "../models/userDao";

export const joinUser = async (body) => {
  // 파라미터 값이 제대로 들어오는지 확인하기 위해 로그 추가
  console.log("joinUser body:", body);

  const prefer = body.prefer;

  const joinUserData = await addUser({
    'email': body.email,
    'name': body.name,
    'gender': body.gender,
    'age': body.age,
    'address': body.address,
    'small_address': body.small_address,
    'point': body.point,
    'prefer': prefer // 선호 카테고리 배열 포함
  });

  if (joinUserData == -1) {
    throw new BaseError(status.EMAIL_ALREADY_EXIST);
  } else {
    const user = await getUser(joinUserData);
    const userPrefer = await getUserPreferToUserID(joinUserData);

    console.log("getUser result:", user);
    console.log("getUserPreferToUserID result:", userPrefer);

    if (!user || !userPrefer) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }

    return signinResponseDTO(user[0], userPrefer);
  }
}
