export const confirmMission = "SELECT EXISTS(SELECT 1 FROM mission WHERE store_id = ? AND body = ?) as isExistMission";
export const insertMissionSql = "INSERT INTO mission (store_id, reward, body, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())";
