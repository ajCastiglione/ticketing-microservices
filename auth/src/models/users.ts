import mongoose from "mongoose";
import { PasswordManager } from "../services/password";

// Interface that describes the properties that are required for a new User.
// This interface is used to define the shape of the data that will be passed to the User Model when creating a new user.
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has.
// A Model in Mongoose is a class that is used to create and manage documents in the database.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has.
// A Document is an instance of a Model in Mongoose, which represents a single document in the database.
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
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
    // This sort of mixes the "View" of MVC patterns, but is useful for microservices to set uniform payload structures.
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
