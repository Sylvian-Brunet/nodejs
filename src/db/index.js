import mongoose from 'mongoose'

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/yuka-miw', {autoReconnect: true, useNewUrlParser: true});
};

export let db;

export default () => {
    return new Promise((resolve, reject) => {
        db = mongoose.connection;
        db.on('connecting', () => {
           console.log('Connexion a mongo ..');
        });
        db.on('error', (err) => {
            mongoose.disconnect();
            reject(err);
            throw new Error('Database Error');
        });
        db.once('open', () => {
           console.log('Connecté a Mongo !');
           resolve();
        });
        db.on('disconnected', () => {
           setTimeout(() => {
               try {
                   connect();
               } catch (err) {
                   throw new Error('Cannot reconnect ..');
               }
           }, 5000);
        });

        connect();
    })
}