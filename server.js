import express from 'express';
import { tempRouter } from './routes/tempRoute';

const app = express();
const port = 3000;

// route setting
app.use('/temp', tempRouter);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});


// server start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});