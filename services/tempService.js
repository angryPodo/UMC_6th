import { tempResponseDTO } from "../dtos/tempResponseDTO"
import { flagResponseDTO } from "../dtos/tempResponseDTO";

export const getTempData = () => {
  return tempResponseDTO("This is TEST! >.0")
}

export function CheckFlag(flag) {
  if (flag == 1)
    throw new Error("Flag is 1!!");
  else {
    return flagResponseDTO(flag);
  }
}