import express, { response } from 'express';
import { tempRouter } from './routes/tempRoute';

const app = express();
const port = 3000;

// route setting
app.use('/temp', tempRouter);

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