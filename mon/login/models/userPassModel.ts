import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

let userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    minlength: 3
  },
  password: {
    type:String,
    required: true,
    minlength: 3
  }
});

export default mongoose.model<IUser>('MyUsers', userSchema);
