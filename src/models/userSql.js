export const insertUserSql = "INSERT INTO user (email, name, gender, age, address, small_address, point) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM user WHERE id = ?";

export const connectFoodCategory = "INSERT INTO prefer (category_id, user_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";

export const getPreferToUserID =
  "SELECT p.id as prefer_id, p.category_id, p.user_id, fc.name as category_name "
  + "FROM prefer p JOIN food_category fc on p.category_id = fc.id "
  + "WHERE p.user_id = ? ORDER BY p.category_id ASC;";
