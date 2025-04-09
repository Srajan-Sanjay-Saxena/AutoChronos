import express from 'express';
import cookieParser from 'cookie-parser';
import {} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalErrorHandlingMiddleware } from '../controllers/error.controller.js';
import { env } from '../newProcess.js';
import output_false_router from '../Routes/output_false.js';
import output_true_router from '../Routes/output_true.js';
const app = express();
app.use(helmet());
if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(output_false_router);
app.use('/api/v1/swarm/read-ops', output_true_router);
app.get('/', (req, res) => {
    res.send('Site working');
});
app.use(globalErrorHandlingMiddleware);
export { app };
