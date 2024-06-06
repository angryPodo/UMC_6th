import express from 'express';
import { response } from './config/response';
import { tempRouter } from './routes/tempRoute';
import { BaseError } from './config/error';
import { status } from './config/responseStatus';
import { userRouter } from '/.src/routes/userRouter.route.js'

const app = express();
dotenv.cofig();

// route setting
app.use('/temp', tempRouter);
app.use('/user', userRouter);

app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static(__dirname + 'public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

// error handling
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status).send(response(err.data));
});


// server start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});