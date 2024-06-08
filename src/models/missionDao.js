import { pool } from "../../config/dbConfig";
import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { confirmMission, insertMissionSql } from "./missionSql.js";

export const addMissionToDB = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('DB 연결 성공');

    // 같은 store_id와 body가 있는지 확인
    const [missionConfirm] = await conn.query(confirmMission, [data.store_id, data.body]);
    if (missionConfirm[0].isExistMission) {
      conn.release();
      throw new BaseError(status.MISSION_ALREADY_EXIXT, '이미 존재하는 미션입니다.');
    }

    const [result] = await conn.query(insertMissionSql, [data.store_id, data.reward, data.body]);
    conn.release();
    console.log('미션 추가 성공', result.insertId);
    return {
      id: result.insertId,
      store_id: data.store_id,
      reward: data.reward,
      body: data.body,
      created_at: new Date(),
      updated_at: new Date()
    };

  } catch (err) {
    if (conn) conn.release();
    if (err instanceof BaseError) {
      throw err;
    } else {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
};
