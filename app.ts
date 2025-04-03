import express, { Express, Response, NextFunction} from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { Request } from './types'
import validation from './middlewares/validation'

import {
    getBalanceSchema,
    updateBalanceSchema
} from './schemas'
import {userController} from './controllers'
import { runMigrations }from './utils/migrator'

const app: Express = express();
const port = 8100;

const corsOptions = {
    origin: '*',
 }

app.use(morgan('dev'));

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
    req.ctx = {};
    next();
  });

const router = express.Router();

router.post('/balance', validation(updateBalanceSchema), async (req: Request, res: Response) => {
    try {
        const balance = await userController.updateBalance(req.ctx?.validatedData);
        res.status(200).send({balance});
    } catch (err){
        console.log('ERROR:', err);
        res.status(400).send({message: err.message});
    }
});

router.get(`/balance/:userId`, validation(getBalanceSchema),  async (req: Request, res: Response) => {
    try {
        const balance = await userController.getBalance(req.ctx?.validatedData);
        res.status(200).send({balance});
    } catch (err) {
        console.log('ERROR:', err);
        res.status(400).send({message: err.message});
    }
})

app.use('/api/v1', router);

(async () => {
    await runMigrations();
  
    app.listen(port, () => console.log(`Running on port ${port}`));
})();
