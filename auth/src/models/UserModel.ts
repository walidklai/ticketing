import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Password } from "../services/password";

interface UserAttributes {
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

const userSchema = new Schema(
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
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    versionKey: false,
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
