import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface UserAttributes{
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any, UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = model<UserDoc,UserModel>("User", schema);

export { User };
