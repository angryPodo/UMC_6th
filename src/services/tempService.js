import { tempResponseDTO } from "../dtos/tempResponseDTO"
import { flagResponseDTO } from "../dtos/tempResponseDTO";
import { BaseError } from "../config/error";
import { status } from "../config/responseStatus";

export const getTempData = () => {
  return tempResponseDTO("This is TEST! >.0")
}

export function CheckFlag(flag) {
  if (flag == 1) {
    throw new BaseError(status.BAD_REQUEST);
  }
  else if (flag == 2) {
    throw new BaseError(status.FORBIDDEN);
  }
  else {
    return flagResponseDTO(flag);
  }
}