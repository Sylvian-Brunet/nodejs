import express from 'express'
import routes from './routes'
import initdb from './db'
import bodyParser from 'body-parser'
import cors from 'cors'

export default async () => {
    try {
        const app = express();

        await initdb();
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cors());
        routes(app);

        app.listen(process.env.PORT, () => {
            console.log(process.env.PORT, process.env.NODE_ENV);
        });
    } catch (e) {
        console.error(e);
    }
}