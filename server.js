import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { response } from './config/response';
import { BaseError } from './config/error';
import { status } from './config/responseStatus.js';
import { userRouter } from './src/routes/userRoute.js'; // userRouter를 올바르게 불러옵니다.
import { tempRouter } from './src/routes/tempRoute.js'; // tempRouter 추가
import { specs } from './swagger/swagerConfig.js';
import SwaggerUi from 'swagger-ui-express';

const app = express();
dotenv.config();

app.set('port', process.env.PORT || 3000);  // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static(__dirname + '/public')); // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// Swagger 설정
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// 라우트 설정
app.use('/user', userRouter);
app.use('/temp', tempRouter); // temp 라우트 추가

// 에러 핸들링
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status).send(response(err.data));
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});
