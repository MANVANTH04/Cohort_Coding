const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users = new Schema({
    email : String,
    name : String,
    password : String


});

const todos = new Schema({
    userid : ObjectId,
    title : String,
    done : Boolean,

})

const UserModel = mongoose.model("Users", users);
const TodoModel = mongoose.model("todos", todos);

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}


// as of now we have created all the database part. form schema to model. So, now we have to do the authentication part 
// signup, login paths and also for the login path. we have to create the jwt token and for the remaining paths we have to 
// just verify the token with the secret and then if the user is existing. then we can proceed doing it. otherwise we have to send some message like login first