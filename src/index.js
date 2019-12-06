import express from 'express'

export default () => {
    try {
        const app = express();

        app.listen(process.env.PORT, () => {
            console.log(process.env.PORT, process.env.NODE_ENV);
        });
    } catch (e) {
        console.error(e);
    }
}