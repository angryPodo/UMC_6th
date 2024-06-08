export const insertStoreSql = "INSERT INTO store (region_id, name, address,star_rating) VALUES (?, ?, ?, ?);";

export const getStoreID = "SELECT * FROM store WHERE id = ?";

export const confirmStoreName = "SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) as isExistName";
