import mongoose from 'mongoose'

export const dbConfg = {
    connectionUrl: 'mongodb://cms-mongo:27017',
    connectionOptions: {
        useNewUrlParser: true,
        auth: {
            user: 'root',
            password: 'root'
        }
    } as mongoose.ConnectionOptions,

}