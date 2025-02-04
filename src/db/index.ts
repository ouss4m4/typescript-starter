import { connect } from 'mongoose';
// export a connection to mongoose

export async function connectDb() {
  await connect('mongodb://127.0.0.1:27017/test');
  //   console.log('DB Is connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
