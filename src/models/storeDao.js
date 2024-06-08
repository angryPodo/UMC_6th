import { pool } from "../../config/dbConfig";
import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { confirmStoreName, insertStoreSql, insertReviewSql } from "./storeSql.js";

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

export const addReviewToDB = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('DB 연결 성공');

    const [result] = await conn.query(insertReviewSql, [data.store_id, data.user_id, data.review_body, data.star_rating]);
    conn.release();
    console.log('리뷰 추가 성공', result.insertId);
    return {
      id: result.insertId,
      store_id: data.store_id,
      user_id: data.user_id,
      body: data.review_body,
      star_rating: data.star_rating,
      created_at: new Date(),
      updated_at: new Date()
    };

  } catch (err) {
    if (conn) conn.release();
    console.error('쿼리 실행 오류', err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
