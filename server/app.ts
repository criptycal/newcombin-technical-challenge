import express from 'express';
const app = express();
import {startConnection} from './database';
import cors from 'cors';
import morgan from 'morgan';
import payableApi from './api/payable';
import transactionApi from './api/transaction';


startConnection();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//routes
app.use('/api', payableApi);
app.use('/api', transactionApi);

app.get('/test', (req: any, res: any) => {
    console.log('test');
    res.send('test');
});


app.listen(8080, () => {
    console.log('server listening on port 8080');
    console.log('client server listening on port 3000');
});



export default app;