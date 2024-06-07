import { pool } from "../../config/dbConfig";
import { BaseError } from "../../config/error";
import { status } from "../../config/responseStatus";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from "./userSql.js";

// 사용자 추가
export const addUser = async (data) => {
  try {
    const conn = await pool.getConnection();

    const [confirm] = await conn.query(confirmEmail, [data.email]);

    if (confirm[0].isExistEmail) {
      conn.release();
      return -1;
    }

    console.log("User Data:", data);
    console.log("Executing query:", insertUserSql);
    console.log("With parameters:", [data.email, data.name, data.gender, data.age, data.address, data.small_address, data.point]);

    const [result] = await conn.query(insertUserSql, [data.email, data.name, data.gender, data.age, data.address, data.small_address, data.point]);

    const userId = result.insertId;

    // 선호 카테고리 설정
    if (Array.isArray(data.prefer)) {
      for (const categoryId of data.prefer) {
        await conn.query(connectFoodCategory, [categoryId, userId]);
      }
    } else {
      console.error("prefer is not an array:", data.prefer);
    }

    conn.release();
    return userId;

  } catch (err) {
    console.error("Error executing query:", err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}



// 사용자 조회
export const getUser = async (userId) => {
  try {
    const conn = await pool.getConnection();
    const [user] = await conn.query(getUserID, [userId]);

    if (user.length === 0) {
      conn.release();
      return null; // 수정: -1 대신 null을 반환하여 명확하게 함
    }

    conn.release();
    return user;

  } catch (err) {
    console.error("Error in getUser:", err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}

// 선호 카테고리 설정
export const setPrefer = async (userId, foodCategoryId) => {
  try {
    const conn = await pool.getConnection();
    await conn.query(connectFoodCategory, [foodCategoryId, userId]);
    conn.release();
    return;

  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}

// userDao.js
export const getUserPreferToUserID = async (userID) => {
  try {
    const conn = await pool.getConnection();
    const [prefer] = await conn.query(getPreferToUserID, [userID]);

    conn.release();
    return prefer;

  } catch (err) {
    console.error("Error in getUserPreferToUserID:", err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}
