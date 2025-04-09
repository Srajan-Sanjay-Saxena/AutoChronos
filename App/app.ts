import express, { urlencoded } from 'express'
import { type Application } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { env } from '../newProcess.js';
import cors from 'cors';


import { globalErrorHandlingMiddleware } from '../controllers/error.controller.js'
import { writeRouter } from '../Routes/output_false.js'
import { readRouter } from '../Routes/output_true.js'

const app : Application = express();
app.use(helmet());
if(env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(
    cors({
        origin: env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use('/api/v1/swarm/write-ops',writeRouter);
app.use('/api/v1/swarm/read-ops',readRouter);

app.get('/', (req, res)=>{
    res.send('Site working');
})

app.use(globalErrorHandlingMiddleware)

export { app }