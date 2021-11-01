/*
    typescript has no idea what is going on with the arguments that we are passing in this constructor
    we can pass any number of key value pairs
    So we need to use typescript so that we can save this mistake
    teach ts about the arguments

    new User({
        email: 'sk@ksdmf',
        password: 'dmnfd'
    });

    - if we follow this new User({}) pattern in typescript , then we cannot do effective type checking
    - That is why we will create function build user and call it whenever we need to create new user
*/

/*
    userSchema.statics.build = (attrs:UserAttrs)=>{
        return new User(attrs);
    }

    - This is a valid code in javascript
    - But in typescript , you cannot add arbitrary key values in objects ,
    - You need to declare some interfaces and add the desired field in them by extending the base class
*/




import mongoose from 'mongoose';
import {Password} from '../services/password';

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
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
});

/* 
    Middleware function implemented in mongoose
    Every time we save a document , this function gets executed
    The user that we are trying to save is given to us in 'this' keyword and if we use arrow function here then 
    the value of this inside the function will be overridden.
    And it will be in the context of the entire file.
*/
userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password',hashed);
    }
    done();     // now done all the asynchronous work that we needed to do.
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };




