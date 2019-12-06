import express from 'express'
import routes from './routes'
import initdb from './db'

export default () => {
    try {
        const app = express();

        initdb();
        routes(app);

        app.listen(process.env.PORT, () => {
            console.log(process.env.PORT, process.env.NODE_ENV);
        });
    } catch (e) {
        console.error(e);
    }
}