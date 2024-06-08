import { pool } from "../../config/dbConfig";
import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { confirmStoreName, insertStoreSql } from "./storeSql.js";

export const addStore = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('DB 연결 성공');

    const [confirm] = await conn.query(confirmStoreName, [data.name]);
    if (confirm[0].isExistName) {
      conn.release();
      console.log('이미 존재하는 가게입니다.');
      return -1;
    }

    const [result] = await conn.query(insertStoreSql, [data.region_id, data.name, data.address, data.star_rating]);
    conn.release();
    console.log('가게 추가 성공', result.insertId);
    return result.insertId;

  } catch (err) {
    if (conn) conn.release();
    console.error('쿼리 실행 오류', err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
