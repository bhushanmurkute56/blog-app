import {model, Schema} from "mongoose";

    const userSchema = new Schema({
        name : {type : String, required : true},
        email : {type : String, required : true, unique : true},
        password : {type : String, required : true},
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;

//.....Darna Nahi, Jhukna Nahi, Tutna Nahi, Harna Nahi, Rookna Nahi, Time Pass Karna Nahi, Bas Jeetna Hai.....!!