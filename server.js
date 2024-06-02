import express from 'express';
import { response } from './config/response';
import { tempRouter } from './routes/tempRoute';
import { BaseError } from './config/error';
import { status } from './config/responseStatus';

const app = express();
const port = 3000;

// route setting
app.use('/temp', tempRouter);

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