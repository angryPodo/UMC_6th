export const confirmStoreName = "SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) as isExistName";

export const insertStoreSql = "INSERT INTO store (region_id, name, address, star_rating) VALUES (?, ?, ?, ?)";
export const insertReviewSql = "INSERT INTO review (store_id, user_id, body, star_rating, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
