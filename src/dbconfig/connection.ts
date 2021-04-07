import mongoose from 'mongoose';

export const establishDbConnection = (): void => {
  if (process.env.DB_HOST) {
    mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const connection = mongoose.connection;
    connection.once('open', () => console.log('connected to mongodb'));
    connection.on('error', (e) => console.log(e));
  } else {
    console.log('Connection with mongodb failed: DB_HOST is undefined');
  }
};
