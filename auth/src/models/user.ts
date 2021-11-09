import mongoose from 'mongoose'
import { Password } from '../services/password';


//revise

//let us write a type annotation interface for the user check and validation
//below interface for properties to create new user
interface UserAttrs {
  email: string,
  password: string
}

//interface that describe properties a new user model has
//this is what hte entire collection of user looks like
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//the any is replaced with userDoc to return the instace of user

//interface that describes the properties
//that a user document has
//typescripts will throw an error if the property is not listed here
interface UserDoc extends mongoose.Document{
  email: string;
  password: string;
  
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
}, {
  toJSON: { //this changes the way the response is made
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id
      delete ret.password;
      delete ret.__v;
    }
  }
})

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});


userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);



//call this instead of new User so you can do type checking

export {User}